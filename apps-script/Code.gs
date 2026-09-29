/* ============================================================
   Mastery OS evidence record, Google Apps Script
   Dr. Sharilyn Rennie, MedMasters Collaborative

   Paste this whole file into the Apps Script editor of the Google
   Sheet that holds the class record (Extensions > Apps Script).
   SETUP.md has the click-by-click steps.

   WHAT IT DOES
   - POST: appends attempt rows to the "evidence" tab and weekly
     reflections to the "reflections" tab. Rows missing a required
     field, or with a value outside its allowed range, are rejected.
     A row_id already in the sheet is skipped, so a resend never
     makes a duplicate.
   - GET ?action=restore&id=maple-river-otter-42 returns that ID's
     evidence rows, so a student on a new computer can bring their
     progress back.

   WHAT IT NEVER STORES
   No names, emails, or student numbers. The only identifier is
   the random private ID the student's browser made. Anyone who has
   the web app address could send rows, but there is no identity in
   them to expose; validation keeps the noise out.
   ============================================================ */

var EVIDENCE_TAB = 'evidence';
var REFLECTION_TAB = 'reflections';

var EVIDENCE_COLS = ['row_id','student_id','course','mode','item_id','competency','dok','got','possible',
                     'confidence','reasoning_score','minutes','timestamp','received_at'];
var REFLECTION_COLS = ['row_id','student_id','course','week_start','q1','q2','q3','q4',
                       'picked_competency','timestamp','received_at'];

var ID_RE = /^[a-z]+-[a-z]+-[a-z]+-\d{2}$/;
var COURSES = ['anatomy','physiology'];
var MODES = ['flashcard','braindump','draw','exam','loop'];
var MAX_ROWS_PER_POST = 500;
var MAX_TEXT = 2000;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var rows = Array.isArray(body.rows) ? body.rows.slice(0, MAX_ROWS_PER_POST) : [];
    var refl = Array.isArray(body.reflections) ? body.reflections.slice(0, 50) : [];

    var ev = sheet_(EVIDENCE_TAB, EVIDENCE_COLS);
    var rf = sheet_(REFLECTION_TAB, REFLECTION_COLS);
    var seenEv = existingIds_(ev);
    var seenRf = existingIds_(rf);
    var now = new Date().toISOString();

    var okEv = [], okRf = [], rejected = 0, dupes = 0;
    rows.forEach(function (r) {
      var clean = cleanEvidence_(r);
      if (!clean) { rejected++; return; }
      if (seenEv[clean.row_id]) { dupes++; return; }
      seenEv[clean.row_id] = true;
      clean.received_at = now;
      okEv.push(EVIDENCE_COLS.map(function (k) { return clean[k]; }));
    });
    refl.forEach(function (r) {
      var clean = cleanReflection_(r);
      if (!clean) { rejected++; return; }
      if (seenRf[clean.row_id]) { dupes++; return; }
      seenRf[clean.row_id] = true;
      clean.received_at = now;
      okRf.push(REFLECTION_COLS.map(function (k) { return clean[k]; }));
    });

    if (okEv.length) ev.getRange(ev.getLastRow() + 1, 1, okEv.length, EVIDENCE_COLS.length).setValues(okEv);
    if (okRf.length) rf.getRange(rf.getLastRow() + 1, 1, okRf.length, REFLECTION_COLS.length).setValues(okRf);

    /* Rejected rows are dropped on purpose; the device clears them so a bad
       row cannot block the queue forever. */
    return json_({ ok: true, saved: okEv.length + okRf.length, duplicates: dupes, rejected: rejected });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action !== 'restore') return json_({ ok: true, service: 'Mastery OS evidence record' });
  var id = String(p.id || '').toLowerCase().trim();
  if (!ID_RE.test(id)) return json_({ ok: false, error: 'That is not a valid private ID.' });
  var ev = sheet_(EVIDENCE_TAB, EVIDENCE_COLS);
  var n = ev.getLastRow() - 1;
  if (n < 1) return json_({ ok: true, rows: [] });
  var data = ev.getRange(2, 1, n, EVIDENCE_COLS.length).getValues();
  var out = [];
  data.forEach(function (row) {
    if (row[1] !== id) return;
    var o = {};
    EVIDENCE_COLS.forEach(function (k, i) { o[k] = row[i] instanceof Date ? row[i].toISOString() : row[i]; });
    out.push(o);
  });
  return json_({ ok: true, rows: out });
}

/* ---------------------------------------------------------------- validation */
function cleanEvidence_(r) {
  if (!r || typeof r !== 'object') return null;
  var o = {};
  o.row_id = str_(r.row_id, 60); if (!o.row_id) return null;
  o.student_id = String(r.student_id || '').toLowerCase(); if (!ID_RE.test(o.student_id)) return null;
  o.course = String(r.course || ''); if (COURSES.indexOf(o.course) < 0) return null;
  o.mode = String(r.mode || ''); if (MODES.indexOf(o.mode) < 0) return null;
  o.item_id = str_(r.item_id, 200); if (!o.item_id) return null;
  o.competency = str_(r.competency, 120); if (!/^[a-z0-9-]+$/i.test(o.competency)) return null;
  o.dok = int_(r.dok, 1, 4); if (o.dok === null) return null;
  o.possible = num_(r.possible, 1, 500); if (o.possible === null) return null;
  o.got = num_(r.got, 0, o.possible); if (o.got === null) return null;
  o.confidence = blankOr_(r.confidence, 1, 5); if (o.confidence === undefined) return null;
  if (o.mode !== 'loop' && o.confidence === '') return null;           /* confidence is required outside Loops */
  o.reasoning_score = blankOr_(r.reasoning_score, 0, 5); if (o.reasoning_score === undefined) return null;
  if (o.mode !== 'exam' && o.reasoning_score !== '') return null;       /* exam engine only */
  o.minutes = num_(r.minutes, 0, 240); if (o.minutes === null) return null;
  var t = new Date(r.timestamp); if (isNaN(t.getTime())) return null;
  o.timestamp = t.toISOString();
  return o;
}
function cleanReflection_(r) {
  if (!r || typeof r !== 'object') return null;
  var o = {};
  o.row_id = str_(r.row_id, 60); if (!o.row_id) return null;
  o.student_id = String(r.student_id || '').toLowerCase(); if (!ID_RE.test(o.student_id)) return null;
  o.course = String(r.course || ''); if (COURSES.indexOf(o.course) < 0) return null;
  o.week_start = String(r.week_start || ''); if (!/^\d{4}-\d{2}-\d{2}$/.test(o.week_start)) return null;
  ['q1','q2','q3','q4'].forEach(function (k) { o[k] = str_(r[k], MAX_TEXT); });
  o.picked_competency = str_(r.picked_competency, 120);
  var t = new Date(r.timestamp); if (isNaN(t.getTime())) return null;
  o.timestamp = t.toISOString();
  return o;
}
function str_(v, max) {
  var s = String(v == null ? '' : v).trim().slice(0, max);
  /* Stop a leading = + - @ from being read as a spreadsheet formula. */
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
function int_(v, lo, hi) { var n = Number(v); return (Number.isInteger(n) && n >= lo && n <= hi) ? n : null; }
function num_(v, lo, hi) { var n = Number(v); return (isFinite(n) && n >= lo && n <= hi) ? n : null; }
function blankOr_(v, lo, hi) { if (v === '' || v == null) return ''; var n = Number(v); return (Number.isInteger(n) && n >= lo && n <= hi) ? n : undefined; }

/* ---------------------------------------------------------------- sheet helpers */
function sheet_(name, cols) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, cols.length).setValues([cols]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function existingIds_(sh) {
  var n = sh.getLastRow() - 1, seen = {};
  if (n < 1) return seen;
  sh.getRange(2, 1, n, 1).getValues().forEach(function (r) { seen[r[0]] = true; });
  return seen;
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
