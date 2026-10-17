#!/usr/bin/env node
/* ============================================================
   Mastery OS, tools/build-anatomy-data.js
   Builds mos-anatomy-data.js from Dr. Rennie's BIO 004 pages, so
   Mastery OS can point every competency at her own materials.

   It reads, and never changes:
     BIO004-M1..M5-Note-Sheet-Packet.html  the two drawing prompts per competency
     BIO004-M4..M5-Note-Sheet-Key.html     "Your drawing should show" lists
     bio004-m1..m3-sheet-data.js           competency ids for the M1 to M3 sheets
     bio004-card-bank.js, bio004-braindump-practice-data.js
                                           packet number -> competency id
     m*-notes.html                         which notes page covers which competency
     loops-index.js                        Loops per competency
   and the Atlas map made from atlas-competency-map.js.

   Usage: node tools/build-anatomy-data.js <new-build-bio4-solano> <atlas-map.json> <out.js>
   ============================================================ */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const [REPO, ATLAS, OUT, LOOPS_CONTENT] = process.argv.slice(2);
const DOK = require(path.join(__dirname, '..', 'mos-dok-rubric.js'));
const rd = f => fs.readFileSync(path.join(REPO, f), 'utf8');
const ctx = { window: {} }; vm.createContext(ctx);
['competenciesfall2026.js', 'bio004-card-bank.js', 'card-competency-map.js', 'card-competency-fine.js', 'bio004-mastery-items.js', 'bio004-mastery-exam.js', 'bio004-braindump-practice-data.js', 'bio004-m1-sheet-data.js', 'bio004-m2-sheet-data.js', 'bio004-m3-sheet-data.js', 'loops-index.js', 'atlas-competency-map.js']
  .forEach(f => vm.runInContext(rd(f), ctx, { filename: f }));
const W = ctx.window, COMPS = W.BIO004_COMPETENCIES, BYID = {}; COMPS.forEach(c => BYID[c.id] = c);

const decode = s => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, '’').replace(/&middot;/g, '·').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

/* packet number -> competency id, from the card bank and the brain dump data (both carry both) */
const NUM = {};
W.BIO004_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => { if (c.comp != null && c.competencyId) NUM[c.comp] = c.competencyId; })));
W.BIO004_DUMP_PRACTICE.modules.forEach(m => m.topics.forEach(t => t.prompts.forEach(p => { if (p.comps.length === 1 && p.cids.length === 1) NUM[p.comps[0]] = NUM[p.comps[0]] || p.cids[0]; })));
const SHEETDATA = { 1: W.BIO004_M1_SHEET, 2: W.BIO004_M2_SHEET, 3: W.BIO004_M3_SHEET };
function compFor(module, n) {
  if (module <= 3) { const it = (SHEETDATA[module].items || []).find(x => x.n === n); return it ? it.id : null; }
  return NUM[n] || null;
}

/* note sheet packets: prompts A and B */
const sheets = {}, misses = [];
for (let m = 1; m <= 5; m++) {
  const f = `BIO004-M${m}-Note-Sheet-Packet.html`; if (!fs.existsSync(path.join(REPO, f))) continue;
  const s = rd(f), ids = [...s.matchAll(/id="c(\d+)"/g)];
  ids.forEach((mm, i) => {
    const n = +mm[1], seg = s.slice(mm.index, i + 1 < ids.length ? ids[i + 1].index : s.length);
    const id = compFor(m, n); if (!id || !BYID[id]) { misses.push(`M${m} #c${n}`); return; }
    const name = decode((seg.match(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/) || [])[1] || '').replace(/^Competency \d+\.\s*/, '');
    const topic = decode((seg.match(/<p class="wk">([\s\S]*?)<\/p>/) || [])[1] || '');
    const opts = [];
    const re = m <= 3 ? /<div class="opt">([\s\S]*?)<\/div>/g : /<div class="pk">([\s\S]*?)<\/div>/g;
    for (const o of seg.matchAll(re)) {
      const h = o[1];
      const k = decode((h.match(/class="(?:k|lt)"[^>]*>([\s\S]*?)<\/(?:p|span)>/) || [])[1] || '');
      const form = decode((h.match(/class="form">([\s\S]*?)<\/(?:p|span)>/) || [])[1] || '');
      let text = m <= 3 ? decode((h.match(/<\/p><p>([\s\S]*?)<\/p>/) || [])[1] || '') : decode((h.match(/class="tx">([\s\S]*?)<\/span><span class="push">/) || [])[1] || '');
      text = text.replace(/^(Option|Prompt) [AB]\.\s*/, '');
      const then = decode((h.match(/class="push">([\s\S]*?)<\/(?:p|span)>/) || [])[1] || '').replace(/^Then:\s*/, '');
      if (k) opts.push({ k, form, text, then });
    }
    sheets[id] = { module: m, n, name, topic, packet: `${f}#c${n}`, key: null, opts };
  });
}
/* keys: "Your drawing should show" */
let keyed = 0;
for (let m = 4; m <= 5; m++) {
  const f = `BIO004-M${m}-Note-Sheet-Key.html`; if (!fs.existsSync(path.join(REPO, f))) continue;
  const s = rd(f), ids = [...s.matchAll(/<article class="comp" id="c(\d+)"/g)];
  ids.forEach((mm, i) => {
    const n = +mm[1], seg = s.slice(mm.index, i + 1 < ids.length ? ids[i + 1].index : s.length), id = compFor(m, n);
    if (!id || !sheets[id]) return;
    sheets[id].key = `${f}#c${n}`;
    const cols = [...seg.matchAll(/<div class="opt kcol">([\s\S]*?)(?=<div class="opt kcol">|<\/article>)/g)];
    cols.forEach(cm => {
      const h = cm[1], k = decode((h.match(/class="k"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
      const items = [...((h.match(/<p class="kh">[\s\S]*?<ul>([\s\S]*?)<\/ul>/) || [])[1] || '').matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => decode(x[1]));
      const check = decode((h.match(/class="kcheck">([\s\S]*?)<\/p>/) || [])[1] || '').replace(/^Check:\s*/, '');
      const o = sheets[id].opts.find(x => x.k === k); if (o && items.length) { o.items = items; o.check = check; }
    });
    if (sheets[id].opts.some(o => o.items)) keyed++;
  });
}

/* notes pages and concept videos */
const links = {};
const L = id => links[id] || (links[id] = {});
fs.readdirSync(REPO).filter(f => /^m\d-[a-z0-9-]+-notes\.html$/.test(f)).forEach(f => {
  const s = rd(f), title = decode((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || f).split(' · ')[0];
  const vid = (s.match(/href="(?:https:\/\/drsrennie-stack\.github\.io\/new-build-bio4-solano\/)?([a-z0-9-]+-concept-videos\.html)"/) || [])[1] || null;
  for (const mm of s.matchAll(/BIO004-M(\d)-Note-Sheet-Packet\.html#c(\d+)/g)) {
    const id = compFor(+mm[1], +mm[2]); if (!id || !BYID[id]) continue;
    const e = L(id); if (!e.notes) e.notes = { url: f, title };
    if (vid && !e.video) e.video = { url: vid, title: 'Concept videos' };
  }
});
const VID2NOTES = {};
fs.readdirSync(REPO).filter(f => /^m\d-[a-z0-9-]+-notes\.html$/.test(f)).forEach(f => {
  const s = rd(f), title = decode((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || f).split(' \u00b7 ')[0];
  for (const mm of s.matchAll(/([a-z0-9-]+-concept-videos\.html)/g)) if (!VID2NOTES[mm[1]]) VID2NOTES[mm[1]] = { url: f, title };
});
for (let m = 1; m <= 3; m++) (SHEETDATA[m].sets || []).forEach(set => set.items.forEach(n => {
  const id = compFor(m, n); if (!id || !BYID[id] || !set.video) return; const e = L(id); if (!e.video) e.video = { url: set.video, title: set.title };
}));
Object.keys(links).forEach(id => { const e = links[id]; if (!e.notes && e.video && VID2NOTES[e.video.url]) e.notes = VID2NOTES[e.video.url]; });
/* Still missing: match the competency to the notes page of its module whose
   title and section headings share the most words with it. */
const STOP = new Set('the and of to in a an its with from for on by at as or is are their each'.split(' '));
const toks = t => new Set(String(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)).map(w => w.replace(/(ies)$/, 'y').replace(/s$/, '')));
const NOTES = fs.readdirSync(REPO).filter(f => /^m\d-[a-z0-9-]+-notes\.html$/.test(f)).map(f => {
  const s = rd(f), title = decode((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || f).split(' \u00b7 ')[0];
  const heads = [...s.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map(x => decode(x[1])).join(' ');
  return { f, title, mod: +f.charAt(1), tt: toks(title.replace(/^Module \d+\s*/, '')), ht: toks(heads) };
});
COMPS.forEach(c => {
  const e = L(c.id); if (e.notes) return;
  const sh = sheets[c.id], mod = sh ? sh.module : null;
  const topic = sh && sh.topic ? sh.topic.split(' \u00b7 ')[1] || '' : '';
  const ct = toks(c.name + ' ' + c.can + ' ' + topic), tt = toks(topic);
  let best = null, bs = 0;
  NOTES.forEach(n => {
    let sc = 0; ct.forEach(w => { if (n.ht.has(w)) sc += 1; if (n.tt.has(w)) sc += 2; }); tt.forEach(w => { if (n.tt.has(w)) sc += 4; });
    if (mod && n.mod !== mod && !(mod >= 4 && n.mod >= 4)) sc *= 0.3;
    if (sc > bs) { bs = sc; best = n; }
  });
  const GENERIC = new Set(['muscle', 'system', 'anatomy', 'structure', 'nerve', 'vessel', 'module', 'organ', 'gland']);
  const hit = best ? [...new Set([...ct, ...tt])].filter(w => best.tt.has(w) && !GENERIC.has(w)).length : 0;
  if (best && bs >= 4 && hit >= 1) e.notes = { url: best.f, title: best.title, matched: true };
});
Object.keys(sheets).forEach(id => { const e = L(id); e.module = sheets[id].module; e.sheet = sheets[id].packet; if (sheets[id].key) e.key = sheets[id].key; });
const atlas = ATLAS && fs.existsSync(ATLAS) ? JSON.parse(fs.readFileSync(ATLAS, 'utf8')) : {};
Object.keys(atlas).forEach(id => { if (BYID[id]) L(id).atlas = atlas[id].slice(0, 3); });
(W.BIO004_LOOPS || []).forEach(l => (l.comps || []).forEach(id => { if (!BYID[id]) return; const e = L(id); (e.loops = e.loops || []).push({ id: l.id, title: l.title }); }));

/* small lookup tables so Mastery OS can read the other tools' saved results
   without loading the 7 MB card bank on every visit */
const CM = W.BIO004_CARD_COMPETENCY_MAP || {}, idx = { cards: {}, dumps: {}, mi: {}, tf: {} };
W.BIO004_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
  const key = c.lt ? c.lt + ':' + c.lid : t.id + ':' + c.id;
  let comp = c.competencyId && BYID[c.competencyId] ? c.competencyId : null;
  if (!comp) { const f = CM[key] || CM[c.lt ? c.lt + ':' + c.lid : ''] ; if (f && f.comps && f.comps.length === 1 && BYID[f.comps[0]]) comp = f.comps[0]; }
  if (comp) idx.cards[key] = [comp, c.dok || 1];
})));
W.BIO004_DUMP_PRACTICE.modules.forEach(m => m.topics.forEach(t => t.prompts.forEach(p => { const c = (p.cids || []).filter(x => BYID[x]); if (c.length) idx.dumps[p.id] = [c, p.lv || 1]; })));
const MI = (W.BIO004_MASTERY && W.BIO004_MASTERY.items) || {}; Object.keys(MI).forEach(k => { idx.mi[MI[k].id] = MI[k].dok || 2; });
const EXM = (W.BIO004_MASTERY && W.BIO004_MASTERY.exam) || {}; Object.keys(EXM).forEach(k => (EXM[k].tf || []).forEach(q => { idx.tf[q.id] = q.dok || 2; }));
const loopsIdx = {}; (W.BIO004_LOOPS || []).forEach(l => { loopsIdx[l.id] = (l.comps || []).filter(id => BYID[id]); });
if (!loopsIdx['tissues-2'] && loopsIdx.tissues) loopsIdx['tissues-2'] = loopsIdx.tissues.slice(); /* not tagged in loops-index.js yet */
/* Loops are tagged by whole loop. To credit the right competency, each
   station's answer is run through Dr. Rennie's own structure-name rules in
   atlas-competency-map.js (the ones Name it uses), kept to the loop's own
   competencies. A station that fits no rule logs nothing, the same choice
   the Atlas makes, rather than crediting every competency in the loop. */
idx.stations = {}; let stMatched = 0, stTotal = 0;
const RULES = [];
const AM = (W.ATLAS_COMPETENCY_MAP || {}).pages || {};
Object.keys(AM).forEach(pg => (AM[pg].groups || []).forEach(g => { if (g.match && !g.sets && !g.cards) RULES.push({ re: new RegExp(g.match, 'i'), ex: g.exclude ? new RegExp(g.exclude, 'i') : null, comps: g.comps }); }));
const LC = LOOPS_CONTENT && fs.existsSync(LOOPS_CONTENT) ? (() => { const c2 = { window: {} }; vm.createContext(c2); vm.runInContext(fs.readFileSync(LOOPS_CONTENT, 'utf8'), c2); return c2.window.LOOPS_ENGINE_CONTENT; })() : null;
if (LC) LC.loops.forEach(l => {
  const allowed = new Set(loopsIdx[l.id] || []);
  l.stations.forEach((st, i) => {
    stTotal++;
    const hit = new Set();
    (st.ans || []).forEach(name => RULES.forEach(r => { if (r.re.test(name) && !(r.ex && r.ex.test(name))) r.comps.forEach(c => { if (allowed.has(c)) hit.add(c); }); }));
    if (!hit.size && allowed.size <= 2 && allowed.size) allowed.forEach(c => hit.add(c));
    if (hit.size) { idx.stations[l.id + '#' + i] = [...hit]; stMatched++; }
  });
});
const out = { built: new Date().toISOString().slice(0, 10), sheets, links, idx, loops: loopsIdx };
const hdr = `/* ============================================================
   Mastery OS, mos-anatomy-data.js   GENERATED, do not hand-edit
   Built ${out.built} by tools/build-anatomy-data.js from the BIO 004 site.

   sheets: the note sheet prompts A and B for each competency, with
           "Your drawing should show" where a key exists (Modules 4, 5).
   links:  where each competency lives on the course site: notes page,
           concept videos, note sheet and key, Digital Atlas, Loops.
   ============================================================ */\n`;
fs.writeFileSync(OUT, hdr + 'window.MOS_ANATOMY = ' + JSON.stringify(out) + ';\n');
const cnt = k => Object.keys(links).filter(id => links[id][k]).length;
console.log(JSON.stringify({ stations: stMatched + ' of ' + stTotal, cardsIdx: Object.keys(idx.cards).length, dumpsIdx: Object.keys(idx.dumps).length, comps: COMPS.length, sheets: Object.keys(sheets).length, keyed, notes: cnt('notes'), video: cnt('video'), atlas: cnt('atlas'), loops: cnt('loops'), misses: misses.length, missList: misses.slice(0, 10) }));
