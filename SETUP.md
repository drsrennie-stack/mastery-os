# Mastery OS, next-semester build: setup

Dr. Sharilyn Rennie, MedMasters Collaborative
Built September 29, 2026, from the Mastery OS Framework Spec, Draft 2.

## What is in this folder

| File | What it is |
|---|---|
| `index.html` | The whole hub: setup, course picker, the five practice modes, the Weakness Dashboard, pace, focus timer, and the Sunday reflection. |
| `mastery-config.js` | The only file you edit between terms: term start dates, where the content lives, and the class record address. |
| `apps-script/Code.gs` | The Google Apps Script that receives the evidence record into your Google Sheet. |
| `compliance-notes.md` | Accessibility audit for this build. |
| `SETUP.md` | This file. |

## Why the live semester is safe

- This is a new folder. It changes no existing file in either course repo.
- It saves to its own storage keys (`mos2-state`). The Fall 2026 app uses different keys, so neither app can see or overwrite the other's progress.
- It reads the Fall 2026 content files (cards, competencies, checklists, Loops) from the two course sites. It only reads them and never writes to them.
- The one thing it reads from another app is the Loops results (`loopsEngine_v1`), so a student's Loops practice counts here. It only reads that too. On a student's first visit it takes a snapshot and counts only new Loops work from then on.

## Step 1. Put the folder online

Pick one of these:

- **Recommended:** make a new GitHub repo (for example `mastery-os-next`), upload the four files and the `apps-script` folder with "Add file, Upload files", then turn on GitHub Pages for it. The address will be `https://drsrennie-stack.github.io/mastery-os-next/`.
- Or upload the folder into an existing course repo as a new folder. That adds new files only.

Either way the page has to live somewhere on `drsrennie-stack.github.io`. That shared address is what lets it read the Loops results and keeps student progress in one place.

## Step 2. Make the class record (about 10 minutes)

1. Make a new Google Sheet in your Google Drive, for example "Mastery OS class record".
2. In the Sheet, choose **Extensions, Apps Script**.
3. Delete what is in the editor, paste in all of `apps-script/Code.gs`, and press Save.
4. Click **Deploy, New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Description: Mastery OS record
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**. Google asks you to authorize it: choose your account, then Advanced, then "Go to (project name)", then Allow.
6. Copy the **Web app URL**. It ends in `/exec`.
7. Paste it into `mastery-config.js` as `sheetUrl: 'https://script.google.com/macros/s/.../exec',` and upload that file again.

The `evidence` and `reflections` tabs create themselves the first time a row arrives.

"Anyone" access is needed because students do not sign in. The rows carry no names, so an outsider could only add junk rows, and the script rejects any row that is missing a field or out of range.

If you ever change `Code.gs`, use **Deploy, Manage deployments, Edit, Version: New version**, so the URL stays the same.

## Step 3. Set the term

In `mastery-config.js`:

- `termLabel`: for example `'Spring 2027'`.
- `courses.anatomy.termStart` and `courses.physiology.termStart`: the Monday of week 1 as `'YYYY-MM-DD'`. A competency opens on the Monday of the week it is taught. Leave it blank and everything is open from day one.
- When the new term's content files are ready, change each course's `base` to the new site. Until then it uses the Fall 2026 files.

## Step 4. Embed it

The page sends its height to Canvas or Kajabi with the id `mastery-os`, the same way your other pages do. Links to the Loops app and the drawing canvas use `target="_top"`.

## How a student's data moves

1. The first time they open Mastery OS, the browser makes a random ID like `maple-river-otter-42`. Their name stays in their browser.
2. Every attempt saves one row per competency: `student_id, course, mode, item_id, competency, dok, got, possible, confidence, reasoning_score, minutes, timestamp`. Each row also carries a `row_id`, so a resend never makes a duplicate.
3. Rows wait on the device and send when the page is online and `sheetUrl` is set. If the record is down, nothing is lost.
4. On a new computer, the student types their ID and the page rebuilds their review schedule from their rows.

## Decisions applied (from spec Draft 2)

- Confidence is rated from 1 to 5 before the attempt, in every mode.
- Grade goals: A at least 20 hours a week outside class, B about 16, C about 14.
- The focus timer can be changed: presets, build-your-own, and the baseline finder.
- The week resets Sunday at 5 pm, the student's local time. The reflection opens once on the first visit after that, and a banner stays on Today until it is done.
- The AI Mastery Coach from the fall build is not in this build. Nothing here sends anything to an AI service.

## Defaults I chose (change any of them)

- **The reflection is optional.** It opens on its own and nags from Today, but it does not lock anything. The spec leaves this open.
- **Where the competency lists live:** each course's existing file (`competenciesfall2026.js` for anatomy, `bio005-competencies.js` for physiology), named in `mastery-config.js`. The spec leaves this open.
- **Exam engine reasoning score:** the student scores their own reasoning from 0 to 5 against your explanation. The spec says the engine scores it. Doing that automatically would mean sending student writing to an AI, which the privacy rules rule out.
- **Correct on the second try counts as half** (0.5 of 1), so it is treated as not known yet and comes back soon.
- **What counts as high:** performance 80% or more, confidence 4 or 5.
- **Spacing:** after each confident success the gap grows 1, 3, 7, 14, then 30 days. A confident success before the review is due does not move the gap up. A miss starts it over at 1 day. A confident miss is a blind spot: it comes back the same day and goes to the top.
- **DOK for items that had none:** drawings are DOK 2 and Loops are DOK 1. Anatomy brain dump prompts had no DOK, so the rubric matcher placed all 269. 195 of those are flagged for your review, mostly because they begin with "Explain" and give no scenario, which is the flag rule in the spec.
- **Physiology drawings:** 57 of the 128 drawing checklists were split from the competency sentence at each comma and have lines like "or organ alters its function." Those 57 are held back so students never see a broken checklist. The other 71 are offered.
- **Loops confidence:** Loops rates confidence 1 to 4. Mapped to this scale: 1 to 1, 2 to 2, 3 to 4, 4 to 5.
- **Loops minutes:** Loops does not record time, so each station counts as about 15 seconds toward the weekly hours.

## Not in this build yet

- Loops for physiology (the Loops format for BIO 005 has not been chosen).
- A reviewer screen for the DOK-flagged items. The matcher runs in the page; the review list is the next thing to build.
- Focus sounds from the fall timer (YouTube slots and green noise).
- Line-by-line competency tags on brain dump and drawing checklists. Right now each checklist is tagged as a whole, with the competencies your map files already give it.
