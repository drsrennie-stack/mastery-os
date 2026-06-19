# Mastery OS

A learning operating system for the health sciences. Students set goals; the
platform sets the route, schedule, difficulty, and practice type. Anatomy and
physiology is the first implementation; the engines generalize to any course
where competence is the point.

The line: students choose the destination, the platform chooses the route.

## What's in here

- `index.html` — the working app. A self-contained, single-file HTML
  application (vanilla JS, no build step, no dependencies). Includes the
  macOS-style first-run setup wizard and the Mastery OS shell: the "Right Now"
  front door, the competency-session runner with the activity picker (recall,
  labeling lab, drawing canvas, AI-tutor prompt export, teach-back), a
  performance-driven readiness dashboard, and a settings drawer where the
  learning-needs toggles live-reconfigure the page.
- `brief.html` — the project brief: what is being built, every decision made,
  and the decisions made against. Carries the MCAS / BIO 304 brand.

## Running it

Open `index.html` in any modern browser. There is no server, build, or install.

To put it online, push to any static host (GitHub Pages, Netlify, Cloudflare
Pages). `index.html` serves at the root.

## Notes

- **Persistence.** Setup and progress are saved to the browser's localStorage,
  so the app remembers a returner. If storage is blocked (some sandboxed
  previews), it falls back to in-memory and still runs for the session.
  Reset and re-run setup from the gear icon, "Reset and run setup again."
- **Course catalog.** Anatomy is the live module (the sample region is cardiac
  anatomy: chambers, great vessels, valves, and the heart wall). The rest
  (Physiology, A&P I, A&P II, A&P Non-Majors, Microbiology, Pathophysiology,
  Pharmacology, Nursing NCLEX-RN) are listed and tagged "In build." Nothing
  fakes content it doesn't have yet.
- **Build order.** Anatomy first: it is the most labeling-native subject and the
  identification content cascades into A&P I and II, the non-majors survey, and
  the "normal" baseline that pathophysiology breaks. Microbiology next, since its
  organism bank seeds pharmacology, pathophysiology, and the clinical-nursing
  layer. One course at a time, following the crossover hubs, so no content gets
  authored twice.
- **Practical scheduling.** Setup asks only for the next practical date plus how
  many practicals are in the term, so the front door always points at the next
  one. An optional planner lets you (or the instructor) enter the full term of
  dates and topics; when that exists, the dashboard shows a semester strip and
  scoring a practical auto-advances the target and folds its topics into spaced
  review. All-at-once for the scheduler, next-only for the experience.
- **Study hours.** Setup captures the course's credit load and anchors to the
  Carnegie guideline (about 2 to 3 study hours per credit hour per week), then
  adjusts: the band scales with the grade goal (Carnegie targets a pass; an A
  needs more), and lab-memorization courses (Anatomy, A&P, Microbiology) get an
  uplift because their lab is studied, not just attended, which standard Carnegie
  ignores. Lecture courses (Physiology, Patho, Pharm, NCLEX) use plain Carnegie.
  The estimate is framed as a starting point that depends on the student, and
  choosing below the band shows an honest note without moving the bar.
- **Read aloud (voice).** The labeling lab can speak each structure name via the
  browser's built-in speech (Web Speech API, no library, no load cost, works
  offline). A speaker button is always available to replay; the "Read structures
  aloud" accommodation auto-reads each one. On-screen text is always present as
  the fallback.
- **Tutored exam (live, in-system).** The "Tutored exam" activity runs the
  MedMasters exam engine live inside a session: one question at a time, the
  student answers and justifies, the tutor grades, hints, allows one retry, and
  answers follow-up questions, all in an in-app chat that never leaves Mastery
  OS. The engine (DOK rubric and targets, anti-bias answer-position balancing,
  justification loop, reasoning bonus, Gap Finder, discipline scope, NCLEX/NGN
  rules) is lifted intact. Depth is auto-set from the student's mastery level
  (mastery velocity) and grading strictness from their mode; the student just
  hits Begin. A collapsed "Adjust" exposes depth/grading/count for power users.
- **Connecting the tutor.** The chat calls Claude via one `callTutor()` function.
  Inside Claude.ai it works with no key (proxied). For an embedded deployment
  (e.g. Kajabi), point `S.tutorEndpoint` at a serverless proxy that holds one
  key server-side (best student experience, nothing to paste, no per-student
  key), or set `S.apiKey` for bring-your-own-key. If the tutor can't reach the
  API it shows an in-system not-connected state with an inline key field; it
  never hands the student off to another site.
- **Pomodoro sessions.** Study runs on the Pomodoro rhythm: a focused block,
  a short break, repeat, with an "earned a hands-on one" nudge after heads-down
  blocks. The first session shows a one-time explainer of what Pomodoro is and
  why it helps. Blocks are 25 minutes, or 15 if shortened by a learning need.
  The "turn off the countdown clock" need hides the timer across the whole
  session (not just recall) while keeping the break rhythm and the calm progress
  bar, so the structure stays without the ticking pressure.
- **Per-exam check-in.** When a practical is scored, the dashboard prompts the
  student to reassess weekly hours up or down for the next stretch.
- **Topics.** Students never author topics. They come from the course materials:
  the per-practical topic fields in the planner for the self-serve path, and the
  instructor's uploaded lab list and objectives in the build-once model. The
  current sample drills the cardiac region regardless of the topic label, because
  content is only wired for that region so far (topic-to-content is the next build).
- **Brand.** House navy is the near-black #080F1E (deepest #04070F), with
  terracotta #8B3A2E and gold #C9A14A accents, Plus Jakarta Sans throughout.

## Still to wire in

The real AI-tutor prompt-builder engine, fuller content banks per course, the
genuine success tips for struggling students in the score-driven mode, and the
real Med Masters Collaborative logo.
