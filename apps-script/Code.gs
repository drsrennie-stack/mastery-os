/* ============================================================
   Mastery OS evidence record, Google Apps Script web app
   Dr. Sharilyn Rennie, MedMasters Collaborative

   Receives rows from Mastery OS and writes them to this sheet.
   Four tabs, created automatically the first time a row arrives:
     evidence     one row per attempt per competency (the spec's record)
     sessions     completed focus timer sessions (weekly hours)
     reflections  Sunday reflections
     profiles     goal settings per private ID (no names, ever)

   The web app takes data without a login, so every row is checked.
   Anything missing a required field, or with a value outside the
   allowed range, is rejected. No names, emails or student numbers
   are accepted: there is no column for them.

   Instructor dashboard: in Project Settings > Script properties, add
   ADMIN_KEY with a long passphrase. instructor.html asks for it.

   Deploy: Extensions > Apps Script, paste this file, then
   Deploy > New deployment > Web app, Execute as: Me,
   Who has access: Anyone. Copy the /exec URL into CONFIG.SYNC_URL
   in Mastery OS index.html.
   ============================================================ */

var TABS = {
  evidence: ['student_id', 'course', 'mode', 'item_id', 'competency', 'dok', 'got', 'possible', 'confidence', 'reasoning_score', 'minutes', 'timestamp', 'attempt_id', 'during_focus', 'source', 'received'],
  sessions: ['student_id', 'course', 'minutes', 'timestamp', 'received'],
  reflections: ['student_id', 'course', 'week_of', 'q1_how_well', 'q2_surprised', 'q3_focus_topic', 'q3_competency', 'q4_change', 'summary', 'timestamp', 'received'],
  profiles: ['student_id', 'pin_hash', 'goals', 'last_course', 'focus_minutes', 'updated', 'received']
};
var ID_RE = /^[a-z]+-[a-z]+-[a-z]+-\d{2}$/;
var COURSES = { anatomy: 1, physiology: 1 };
var MODES = { flashcard: 1, braindump: 1, draw: 1, exam: 1, loop: 1, atlas: 1 };
/* where a row came from: Mastery OS itself, or one of the course tools it reads */
var SOURCES = { 'mastery-os': 1, 'recall-app': 1, 'mastery-check': 1, 'dump-app': 1, 'practice-exam': 1, atlas: 1, 'draw-app': 1, 'loops-app': 1 };
var HASH_RE = /^[0-9a-f]{64}$/;
var MAX_ITEMS = 200;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var action = body.action, items = body.items;
    if (!Array.isArray(items) || !items.length || items.length > MAX_ITEMS) return out({ ok: false, error: 'Send between 1 and ' + MAX_ITEMS + ' items' });
    var tab = action === 'profile' ? 'profiles' : action === 'evidence' ? 'evidence' : action === 'session' ? 'sessions' : action === 'reflection' ? 'reflections' : null;
    if (!tab) return out({ ok: false, error: 'Unknown action' });
    var check = { evidence: checkEvidence, sessions: checkSession, reflections: checkReflection, profiles: checkProfile }[tab];
    var good = [], bad = [];
    var received = new Date().toISOString();
    var goodItems = [];
    items.forEach(function (it, i) {
      var err = check(it);
      if (err) bad.push({ i: i, error: err });
      else { good.push(TABS[tab].map(function (c) { return c === 'received' ? received : c === 'source' ? (it.source || 'mastery-os') : clip(it[c]); })); goodItems.push(it); }
    });
    lock.waitLock(20000);
    var sh = sheet(tab);
    if (tab === 'profiles') {
      good.forEach(function (row, i) { upsertProfile(sh, row, goodItems[i]); });
    } else if (good.length) {
      if (tab === 'evidence') good = dropDuplicates(sh, good);
      if (good.length) sh.getRange(sh.getLastRow() + 1, 1, good.length, TABS[tab].length).setValues(good);
    }
    /* A batch with some rejected rows still reports ok so the device
       does not resend the good rows forever; rejects are logged. */
    if (bad.length) log('rejected ' + tab + ': ' + JSON.stringify(bad).slice(0, 2000));
    return out({ ok: true, saved: good.length, rejected: bad.length });
  } catch (err) {
    return out({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/* Restore: GET ?id=maple-river-otter-42&pin=<hash> returns that ID's rows only.
   Instructor: GET ?admin=<ADMIN_KEY> returns usage and class weak spots, no names. */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.admin) return out(adminSummary(p.admin, p.course));
  var id = String(p.id || '').trim().toLowerCase();
  if (!ID_RE.test(id)) return out({ ok: false, error: 'That is not a valid private ID.' });
  var prof = rowsFor('profiles', id), profile = prof.length ? prof[prof.length - 1] : null;
  if (profile && profile.pin_hash && String(p.pin || '') !== String(profile.pin_hash)) {
    Utilities.sleep(800);
    return out({ ok: false, error: 'That ID and PIN do not match. Check both and try again.' });
  }
  var res = { ok: true, evidence: rowsFor('evidence', id), sessions: rowsFor('sessions', id), reflections: rowsFor('reflections', id), profile: null };
  if (profile) { res.profile = { goals: profile.goals, last_course: profile.last_course }; }
  if (!res.evidence.length && !res.sessions.length && !profile) return out({ ok: false, error: 'No records were found for that ID. Check the spelling, or start fresh with it.' });
  return out(res);
}

/* ---------- instructor summary ---------- */
function adminSummary(key, course) {
  var want = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!want || String(key) !== want) { Utilities.sleep(800); return { ok: false, error: 'That instructor key is not right.' }; }
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('evidence');
  var v = sh && sh.getLastRow() > 1 ? sh.getDataRange().getValues() : [[]], h = v[0], ix = {}; h.forEach(function (c, i) { ix[c] = i; });
  var now = Date.now(), DAY = 864e5, students = {}, comps = {};
  for (var r = 1; r < v.length; r++) {
    var row = v[r]; if (course && row[ix.course] !== course) continue;
    var id = row[ix.student_id], t = new Date(row[ix.timestamp]).getTime(), got = +row[ix.got], pos = +row[ix.possible], conf = row[ix.confidence], src = row[ix.source] || 'mastery-os';
    var s = students[id] || (students[id] = { id: id, course: row[ix.course], first: t, last: 0, rows: 0, attempts: {}, days7: {}, days30: {}, minutes: 0, sources: {}, got: 0, pos: 0 });
    s.rows++; s.attempts[row[ix.attempt_id]] = 1; s.first = Math.min(s.first, t); s.last = Math.max(s.last, t); s.got += got; s.pos += pos; s.sources[src] = (s.sources[src] || 0) + 1;
    var day = Utilities.formatDate(new Date(t), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (now - t < 7 * DAY) s.days7[day] = 1; if (now - t < 30 * DAY) s.days30[day] = 1;
    var c = comps[row[ix.competency]] || (comps[row[ix.competency]] = { comp: row[ix.competency], students: {}, got: 0, pos: 0, miscal: 0 });
    c.students[id] = 1; c.got += got; c.pos += pos; if (+conf >= 4 && pos && got / pos < 0.8) c.miscal++;
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessions'), mins = {};
  if (ss && ss.getLastRow() > 1) ss.getDataRange().getValues().slice(1).forEach(function (x) { if (!course || x[1] === course) mins[x[0]] = (mins[x[0]] || 0) + (+x[2] || 0); });
  var list = Object.keys(students).map(function (k) { var s = students[k]; return { id: s.id, course: s.course, first: new Date(s.first).toISOString(), last: new Date(s.last).toISOString(), attempts: Object.keys(s.attempts).length, activeDays7: Object.keys(s.days7).length, activeDays30: Object.keys(s.days30).length, focusMinutes: mins[s.id] || 0, score: s.pos ? Math.round(s.got / s.pos * 100) : null, sources: s.sources }; })
    .sort(function (a, b) { return b.last < a.last ? -1 : 1; });
  var weak = Object.keys(comps).map(function (k) { var c = comps[k]; return { comp: c.comp, students: Object.keys(c.students).length, score: c.pos ? Math.round(c.got / c.pos * 100) : null, miscal: c.miscal }; })
    .filter(function (c) { return c.students >= 2; }).sort(function (a, b) { return a.score - b.score; }).slice(0, 60);
  return { ok: true, built: new Date().toISOString(), students: list, weak: weak };
}

/* ---------- validation ---------- */
function num(v) { return typeof v === 'number' ? v : (v === '' || v == null ? NaN : Number(v)); }
function recent(ts) { var t = new Date(ts).getTime(); if (isNaN(t)) return false; var n = Date.now(); return t > n - 400 * 864e5 && t < n + 2 * 864e5; }
function checkEvidence(r) {
  if (!ID_RE.test(r.student_id || '')) return 'student_id';
  if (!COURSES[r.course]) return 'course';
  if (!MODES[r.mode]) return 'mode';
  if (!r.item_id || String(r.item_id).length > 160) return 'item_id';
  if (!/^[a-z0-9-]{3,80}$/i.test(r.competency || '')) return 'competency';
  var dok = num(r.dok); if ([1, 2, 3, 4].indexOf(dok) < 0) return 'dok';
  var pos = num(r.possible), got = num(r.got);
  if (!(pos >= 1 && pos <= 500)) return 'possible';
  if (!(got >= 0 && got <= pos)) return 'got';
  var src = r.source || 'mastery-os'; if (!SOURCES[src]) return 'source';
  /* Mastery OS always asks confidence first; some older tools did not keep it */
  if (src === 'mastery-os' || (r.confidence !== '' && r.confidence != null)) { var c = num(r.confidence); if ([1, 2, 3, 4, 5].indexOf(c) < 0) return 'confidence'; }
  if (r.reasoning_score !== '' && r.reasoning_score != null) { var rs = num(r.reasoning_score); if ([0, 1, 2, 3, 4, 5].indexOf(rs) < 0 || r.mode !== 'exam') return 'reasoning_score'; }
  var m = num(r.minutes); if (!(m >= 0 && m <= 240)) return 'minutes';
  if (!recent(r.timestamp)) return 'timestamp';
  if (!r.attempt_id || String(r.attempt_id).length > 160) return 'attempt_id';
  return null;
}
function checkSession(r) {
  if (!ID_RE.test(r.student_id || '')) return 'student_id';
  if (!COURSES[r.course]) return 'course';
  var m = num(r.minutes); if (!(m >= 1 && m <= 240)) return 'minutes';
  if (!recent(r.timestamp)) return 'timestamp';
  return null;
}
function checkReflection(r) {
  if (!ID_RE.test(r.student_id || '')) return 'student_id';
  if (!COURSES[r.course]) return 'course';
  if (isNaN(new Date(r.week_of).getTime())) return 'week_of';
  if (!recent(r.timestamp)) return 'timestamp';
  return null;
}
function checkProfile(r) {
  if (!ID_RE.test(r.student_id || '')) return 'student_id';
  if (r.pin_hash && !HASH_RE.test(r.pin_hash)) return 'pin_hash';
  try { var g = JSON.parse(r.goals || '{}'); for (var k in g) { if (!COURSES[k]) return 'goals'; if (['A', 'B', 'C'].indexOf(g[k].grade) < 0) return 'goals'; } } catch (e) { return 'goals'; }
  return null;
}
function clip(v) { if (v == null) return ''; if (typeof v === 'boolean' || typeof v === 'number') return v; var s = String(v).slice(0, 2000); return /^[=+\-@]/.test(s) ? "'" + s : s; }

/* ---------- sheet helpers ---------- */
function sheet(tab) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(tab);
  if (!sh) { sh = ss.insertSheet(tab); sh.getRange(1, 1, 1, TABS[tab].length).setValues([TABS[tab]]).setFontWeight('bold'); sh.setFrozenRows(1); }
  return sh;
}
function rowsFor(tab, id) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab); if (!sh || sh.getLastRow() < 2) return [];
  var v = sh.getDataRange().getValues(), h = v[0], out = [];
  for (var i = 1; i < v.length; i++) if (String(v[i][0]).toLowerCase() === id) { var o = {}; h.forEach(function (c, j) { o[c] = v[i][j] instanceof Date ? v[i][j].toISOString() : v[i][j]; }); out.push(o); }
  return out;
}
function dropDuplicates(sh, rows) {
  /* the same attempt can arrive twice if a device retries; keep one */
  var n = sh.getLastRow(), cols = TABS.evidence, ai = cols.indexOf('attempt_id'), ci = cols.indexOf('competency'), di = cols.indexOf('dok'), seen = {};
  var start = Math.max(2, n - 5000);
  var v = n >= 2 ? sh.getRange(start, 1, n - start + 1, cols.length).getValues() : [];
  v.forEach(function (r) { seen[r[ai] + '|' + r[ci] + '|' + r[di]] = 1; });
  return rows.filter(function (r) { var k = r[ai] + '|' + r[ci] + '|' + r[di]; if (seen[k]) return false; seen[k] = 1; return true; });
}
function upsertProfile(sh, row, item) {
  /* A PIN, once set, can only be changed by someone who knows it. */
  var n = sh.getLastRow(), cols = TABS.profiles, pi = cols.indexOf('pin_hash');
  if (n >= 2) {
    var vals = sh.getRange(2, 1, n - 1, cols.length).getValues();
    for (var i = 0; i < vals.length; i++) if (vals[i][0] === row[0]) {
      var old = String(vals[i][pi] || '');
      if (old && row[pi] !== old && (item.old_pin_hash || '') !== old) { log('profile PIN change refused for ' + row[0]); return; }
      if (!row[pi]) row[pi] = old;
      sh.getRange(i + 2, 1, 1, row.length).setValues([row]); return;
    }
  }
  sh.getRange(n + 1, 1, 1, row.length).setValues([row]);
}
function log(msg) { var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('log') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('log'); sh.appendRow([new Date(), msg]); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* Run once from the editor to create the tabs with headers. */
function setup() { Object.keys(TABS).forEach(sheet); }
