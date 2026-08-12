/* ============================================================
   BIO 004 Human Anatomy, Fall 2026
   resources.js

   Per-competency study resources for Mastery OS. This replaces the
   empty stub that was in the repo. Every URL below was checked to
   exist in drsrennie-stack/new-build-bio4-solano on 2026-08-11.
   Nothing is invented. A competency with no entry falls through to
   the app's generic buttons, exactly as before.

   HOW MASTERY OS READS IT
   -----------------------
       function resFor(comp){
         var R = window.BIO004_RESOURCES;
         return (R && comp && R[comp.id]) ? R[comp.id] : null;
       }

   Slots the app renders as buttons, in this order:
       loom       Watch concept video
       labSprint  Lab sprint
       loops      Lab ID loops
       recall     Spaced recall
       notes      Notes

   Extra slots (worksheet, studyGuide, slides, structureList) are
   carried here for the next build. The app ignores them today, it
   does not break on them.

   COVERAGE
   --------
   Module 1 (weeks 1 to 3): all 23 competencies. NEW.
   Module 3 heart / respiratory / vessels: 13 competencies, carried
   over verbatim from the working copy in the Mastery OS project
   folder, including the Loom chapter start times. That work had
   never been pushed to the repo.

   Module 1 Loom links have NO chapter timestamps, because the
   Module 1 concept-video pages do not carry data-s chapter marks
   the way the heart, respiratory and blood-vessel pages do. They
   open at 0:00. Add ?t=SECONDS here once those chapters exist.

   There is no cavities worksheet. Those five competencies point at
   the intro worksheet, which is where the cavities drawings
   (M1-2, M1-3) actually live.

   Loops have no per-topic deep link yet, so every loops slot opens
   the topic picker.

   Author: Dr. Sharilyn Rennie.
   ============================================================ */
(function(){

var C     = 'https://drsrennie-stack.github.io/new-build-bio4-solano/';
var LOOPS = 'https://drsrennie-stack.github.io/loops/';
var RECALL = C + 'bio004-spaced-recall.html';

/* Build a Loom share URL, starting at t seconds when t is given. */
function L(id, t){ return 'https://www.loom.com/share/' + id + (t != null ? '?t=' + t : ''); }

/* ---------- Loom video ids ---------- */
/* Module 1 */
var V_WEEK1  = 'cf83f12d4c4242c7b0235021fce14098';  /* foundations, terms, cavities */
var V_CELL   = '0c512337c4e2411294f72c99b67395c6';
var V_TISSUE = '6e5f5775557344f38367ea31f8c32b34';
var V_SKIN   = 'afbd0687e4db47b19457d9fdefd7444f';
/* Module 3 */
var V_HEART  = '7da62b7ed696474b8de9e3f18603d706';
var V_RESP   = '69f53b5f9da4407e8c6fb844eef9b878';
var V_VESSEL = '3ec215800381455b91ad481c223a001b';

var M1LIST = C + 'module-1-structure-list.html';

/* ---------- Module 1 topic bundles ---------- */
var introPages = {
  notes:        C + 'm1-intro-notes.html',
  worksheet:    C + 'm1-intro-worksheet.html',
  labSprint:    C + 'week-1-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var cavityPages = {
  notes:        C + 'm1-cavities-notes.html',
  worksheet:    C + 'm1-intro-worksheet.html',   /* no separate cavities worksheet */
  labSprint:    C + 'week-1-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var cellPages = {
  notes:        C + 'm1-cell-notes.html',
  worksheet:    C + 'm1-cell-worksheet.html',
  labSprint:    C + 'week-1-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var tissuePagesW1 = {
  notes:        C + 'm1-tissues-notes.html',
  worksheet:    C + 'm1-tissues-worksheet.html',
  labSprint:    C + 'week-1-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var tissuePagesW2 = {
  notes:        C + 'm1-tissues-notes.html',
  worksheet:    C + 'm1-tissues-worksheet.html',
  labSprint:    C + 'week-2-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var tissuePagesW3 = {
  notes:        C + 'm1-tissues-notes.html',
  worksheet:    C + 'm1-tissues-worksheet.html',
  labSprint:    C + 'week-3-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};
var skinPages = {
  notes:        C + 'm1-integumentary-notes.html',
  worksheet:    C + 'm1-integumentary-worksheet.html',
  labSprint:    C + 'week-3-lab-sprints.html',
  structureList:M1LIST, recall:RECALL, loops:LOOPS
};

/* ---------- Module 3 topic bundles (carried over, unchanged) ---------- */
var heartPages  = { notes:C+'heart.html',         labSprint:C+'heart-lab-sprint.html',         workbook:C+'heart-workbook.html',         studyGuide:C+'heart-study-guide.html',        slides:C+'slides-heart-anatomy.html',       recall:RECALL, loops:LOOPS };
var respPages   = { notes:C+'respiratory.html',   labSprint:C+'respiratory-lab-sprint.html',   workbook:C+'respiratory-workbook.html',   studyGuide:C+'respiratory-study-guide.html',  slides:C+'slides-respiratory-anatomy.html', recall:RECALL, loops:LOOPS };
var vesselPages = { notes:C+'blood-vessels.html', labSprint:C+'blood-vessels-lab-sprint.html', workbook:C+'blood-vessels-workbook.html', studyGuide:C+'blood-vessels-study-guide.html',slides:C+'slides-blood-vessels.html',       recall:RECALL, loops:LOOPS };

function mk(pages, loomUrl){ var o={}; for(var k in pages) o[k]=pages[k]; o.loom=loomUrl; return o; }

window.BIO004_RESOURCES = {

  /* ================= MODULE 1, weeks 1 to 3 ================= */

  /* Week 1, Foundations and the language of anatomy */
  'w1-levels-organization':      mk(introPages,  L(V_WEEK1)),
  'w1-anatomical-position':      mk(introPages,  L(V_WEEK1)),
  'w1-planes-sections':          mk(introPages,  L(V_WEEK1)),
  'w1-directional-terms':        mk(introPages,  L(V_WEEK1)),
  'w1-regional-terms':           mk(introPages,  L(V_WEEK1)),

  /* Week 1, Body cavities and regions */
  'w1-body-cavities':            mk(cavityPages, L(V_WEEK1)),
  'w1-serous-membranes':         mk(cavityPages, L(V_WEEK1)),
  'w1-mediastinum':              mk(cavityPages, L(V_WEEK1)),
  'w1-peritoneum-relationships': mk(cavityPages, L(V_WEEK1)),
  'w1-abdominopelvic-map':       mk(cavityPages, L(V_WEEK1)),

  /* Week 1, Cell anatomy */
  'w1-generalized-cell':         mk(cellPages,   L(V_CELL)),
  'w1-plasma-membrane':          mk(cellPages,   L(V_CELL)),
  'w1-nucleus':                  mk(cellPages,   L(V_CELL)),
  'w1-organelles':               mk(cellPages,   L(V_CELL)),

  /* Week 1, Tissues and histology */
  'w1-germ-layers':              mk(tissuePagesW1, L(V_TISSUE)),
  'w1-epithelial-id':            mk(tissuePagesW1, L(V_TISSUE)),
  'w1-cell-junctions':           mk(tissuePagesW1, L(V_TISSUE)),

  /* Week 2, Connective tissue */
  'w1-connective-id':            mk(tissuePagesW2, L(V_TISSUE)),

  /* Week 3, Body membranes and integumentary */
  'w1-body-membranes':           mk(tissuePagesW3, L(V_TISSUE)),
  'w1-skin-layers':              mk(skinPages,   L(V_SKIN)),
  'w1-epidermal-strata':         mk(skinPages,   L(V_SKIN)),
  'w1-dermis-layers':            mk(skinPages,   L(V_SKIN)),
  'w1-skin-accessory':           mk(skinPages,   L(V_SKIN)),

  /* ========= MODULE 3, heart, respiratory, vessels =========
     Chapter start times from the data-s marks on the concept-video
     pages. Heart: surfaces and wall 1:58, chambers 12:33,
     septum and fetal 16:01, valves 26:56, conduction 32:38,
     coronary 41:20. Respiratory: lungs and diaphragm 4:10,
     larynx 15:53, trachea 22:46, alveoli 30:02, lung sections 34:04,
     breathing muscles 39:59. Vessels: three layers 3:57. */

  'cv-surfaces':                 mk(heartPages,  L(V_HEART, 118)),
  'cv-chambers':                 mk(heartPages,  L(V_HEART, 753)),
  'cv-valves':                   mk(heartPages,  L(V_HEART, 1616)),
  'cv-conduction-anat':          mk(heartPages,  L(V_HEART, 1958)),
  'cv-coronary':                 mk(heartPages,  L(V_HEART, 2480)),
  'bvn-fetal-remnants':          mk(heartPages,  L(V_HEART, 961)),
  'bvn-great-vessels':           mk(heartPages,  L(V_HEART)),

  'resp-larynx':                 mk(respPages,   L(V_RESP, 953)),
  'resp-tree':                   mk(respPages,   L(V_RESP, 1366)),
  'resp-lungs-pleura':           mk(respPages,   L(V_RESP, 2044)),
  'resp-thoracic-diaphragm':     mk(respPages,   L(V_RESP, 2399)),
  'resp-histo':                  mk(respPages,   L(V_RESP, 1802)),

  'bvn-vessel-tunics':           mk(vesselPages, L(V_VESSEL, 237))
};

})();
