/* ============================================================
   Mastery OS, next-semester build
   mastery-config.js

   THE ONLY FILE YOU EDIT BETWEEN TERMS.

   index.html reads everything from here: where each course's
   content lives, when the term starts, and where the evidence
   record is sent. Nothing in index.html needs to change.

   1. sheetUrl
      Paste the Apps Script web app address (it ends in /exec).
      See SETUP.md. Leave it blank and everything still works;
      attempts wait on the student's device and send as soon as
      an address is added.

   2. termLabel
      Shown in the header, for example 'Spring 2027'.

   3. courses.<course>.termStart
      The Monday of week 1, written YYYY-MM-DD. A competency opens
      on the Monday of the week it is taught. Leave it blank and
      every competency is open from day one.

   4. courses.<course>.base and scripts
      Where the content files live. Right now these point at the
      Fall 2026 course sites, read only. Mastery OS never writes to
      those files, so the live semester is untouched. When the new
      term's files are ready, point base at the new site.
   ============================================================ */
window.MOS_CONFIG = {
  termLabel: '',
  sheetUrl: '',

  /* The week resets on Sunday at 5 pm, when the reflection opens.
     0 = Sunday. 17 = 5 pm, the student's local time. */
  weekResetDay: 0,
  weekResetHour: 17,

  /* Weekly study hours outside class for each grade goal. */
  gradeHours: { A: 20, B: 16, C: 14 },

  courses: {
    anatomy: {
      label: 'Anatomy',
      code: 'BIO 004',
      full: 'BIO 004 Human Anatomy',
      termStart: '',
      base: 'https://drsrennie-stack.github.io/new-build-bio4-solano/',
      scripts: [
        'competenciesfall2026.js',
        'bio004-card-bank.js',
        'card-competency-map.js',
        'card-competency-fine.js',
        'bio004-mastery-items.js',
        'bio004-braindump-data.js',
        'braindump-competency-map.js',
        'draw-checklists.js',
        'loops-index.js',
        'loops-stations.js'
      ],
      canvasUrl: 'https://drsrennie-stack.github.io/new-build-bio4-solano/mastery-canvas.html',
      loopsUrl: 'https://drsrennie-stack.github.io/loops/',
      /* Modes shown first for this course. Every mode stays available. */
      lead: ['loop', 'draw', 'flash', 'exam', 'dump']
    },
    physiology: {
      label: 'Physiology',
      code: 'BIO 005',
      full: 'BIO 005 Human Physiology',
      termStart: '',
      base: 'https://drsrennie-stack.github.io/human-physiology-Fa26/',
      scripts: [
        'bio005-competencies.js',
        'bio005-exam-bank.js',
        'os/draw-checklists.js'
      ],
      canvasUrl: 'https://drsrennie-stack.github.io/human-physiology-Fa26/mastery-canvas.html',
      loopsUrl: '',
      lead: ['exam', 'dump', 'flash', 'draw', 'loop']
    }
  }
};
