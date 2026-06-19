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
- **Brand.** House navy is the near-black #080F1E (deepest #04070F), with
  terracotta #8B3A2E and gold #C9A14A accents, Plus Jakarta Sans throughout.

## Still to wire in

The real AI-tutor prompt-builder engine, fuller content banks per course, the
genuine success tips for struggling students in the score-driven mode, and the
real Med Masters Collaborative logo.
