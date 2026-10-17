#!/usr/bin/env node
/* ============================================================
   Mastery OS, tools/dok-matcher.js
   Runs the DOK rubric (mos-dok-rubric.js) over every item in both
   courses and writes:
     dok-review.html      the flagged items only, for Dr. Rennie
     dok-matcher-report.json   counts and every placement

   Usage (from the mastery-os folder):
     node tools/dok-matcher.js <path to new-build-bio4-solano> <path to human-physiology-Fa26>
   ============================================================ */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = require(path.join(__dirname, '..', 'mos-dok-rubric.js'));
const [anaDir, phyDir] = process.argv.slice(2);
if (!anaDir || !phyDir) { console.error('Give the two repo folders.'); process.exit(1); }

function load(dir, files) {
  const ctx = { window: {} }; vm.createContext(ctx);
  files.forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f }));
  return ctx.window;
}
const A = load(anaDir, ['competenciesfall2026.js', 'bio004-card-bank.js', 'bio004-braindump-practice-data.js', 'bio004-mastery-items.js', 'bio004-mastery-exam.js']);
const Pw = load(phyDir, ['bio005-competencies.js', 'bio005-exam-bank.js']);

const items = [];
function add(course, mode, id, text, authored, lines) { items.push({ course, mode, id, text: String(text || '').trim(), authored: authored || null, lines }); }

/* anatomy */
A.BIO004_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => add('anatomy', 'recall card / exam', 'card:' + (c.lt ? c.lt + ':' + c.lid : t.id + ':' + c.id), c.q, c.dok))));
Object.values(A.BIO004_MASTERY.items).forEach(q => add('anatomy', 'exam', 'a:mi:' + q.id, q.stem, q.dok));
Object.values(A.BIO004_MASTERY.exam).forEach(e => (e.tf || []).forEach(q => add('anatomy', 'exam (true or false)', 'a:tf:' + q.id, q.st.replace(/\[\[|\]\]/g, ''), null)));
A.BIO004_DUMP_PRACTICE.modules.forEach(m => m.topics.forEach(t => t.prompts.forEach(p => add('anatomy', 'brain dump, level ' + p.lv, p.id, p.p, p.lv))));
/* physiology */
Pw.BIO005_EXAM_BANK.items.forEach(q => {
  const text = q.type === 'tf' ? q.statement : q.type === 'bd' ? q.prompt : ((q.case ? q.case + ' ' : '') + q.stem);
  add('physiology', q.type === 'bd' ? 'brain dump' : q.type === 'mc' ? 'flashcard / exam' : 'exam', 'p:' + q.id, text, q.dok, q.type === 'bd' ? q.rubric : null);
});

let flagged = [], stats = { total: 0, sure: 0, flagged: 0, agree: 0, disagree: 0, noAuthored: 0, byCourse: {} };
const report = [];
items.forEach(it => {
  const m = R.match(it.text);
  stats.total++; const bc = stats.byCourse[it.course] = stats.byCourse[it.course] || { total: 0, flagged: 0, disagree: 0 }; bc.total++;
  if (it.authored) { if (it.authored === m.dok) stats.agree++; else { stats.disagree++; bc.disagree++; } } else stats.noAuthored++;
  if (m.flag) { stats.flagged++; bc.flagged++; flagged.push(Object.assign({}, it, { guess: m.dok, flag: m.flag, why: m.why })); } else stats.sure++;
  report.push({ id: it.id, course: it.course, mode: it.mode, authored: it.authored, matcher: m.dok, flag: m.flag });
});
/* Items with an authored level keep it in the hub until Dr. Rennie decides.
   The review page lists every flagged item, authored level first when there is one. */
fs.writeFileSync(path.join(__dirname, '..', 'dok-matcher-report.json'), JSON.stringify({ built: new Date().toISOString(), rubric: R.version, stats, items: report }));

const flagCounts = {}; flagged.forEach(f => flagCounts[f.flag] = (flagCounts[f.flag] || 0) + 1);
const data = flagged.map(f => ({ id: f.id, c: f.course, m: f.mode, t: f.text, a: f.authored, g: f.guess, f: f.flag }));
const tpl = fs.readFileSync(path.join(__dirname, 'dok-review.template.html'), 'utf8')
  .replace('/*DATA*/', 'var ITEMS = ' + JSON.stringify(data) + ';\nvar STATS = ' + JSON.stringify({ stats, flagCounts }) + ';');
fs.writeFileSync(path.join(__dirname, '..', 'dok-review.html'), tpl);
console.log(JSON.stringify({ stats, flagCounts }, null, 1));
