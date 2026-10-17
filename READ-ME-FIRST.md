# Mastery OS, October 17 update

This drop connects Mastery OS to your anatomy course site and gets it ready for the Google Sheet. It was built October 17, 2026. Nothing was pushed, and none of your course pages were changed. The zip holds only the files that changed since the September 29 drop, inside a `hub` folder, so it overwrites the old copies in place.

## What is new

**Your tools are attached.** The hub reads what your other tools already save in the student's browser and adds it to the same record. All your sites share drsrennie-stack.github.io, so this works without changing those tools. Every row is tagged with the tool it came from.

| Tool | What counts |
|---|---|
| Recall cards (Recall Rx v3) | Every card answered, with the "I know this / I think so / Not yet" rating |
| Brain dumps | Every saved brain dump, with points, the key and the confidence |
| Mastery Check | Every answered question, with the confidence from the 4-point spread |
| Practice exam | The per-competency totals it logs |
| Digital Atlas | Name it rounds |
| Loops app | New station attempts, credited to the competency the structure belongs to |

**Your recall cards and brain dumps run inside the hub.** These are your own engines, recall-view.js and braindump-view.js, mounted on their own pages with their levels and their look. A brain dump done in the hub's review list also counts toward your brain dump levels.

**Draw it to know it uses your note sheets.** For Modules 4 and 5, students pick prompt A or B and check their drawing against your "Your drawing should show" key. That covers 97 competencies. Modules 1 to 3 have no keys yet, so those modules still use the 69 worksheet drawings.

**My weak spots, the Weakness Dashboard.**
- It ranks every competency from all of those tools. "Felt sure, missed it" comes first.
- It shows the gap at each DOK level and which tools the evidence came from.
- Each weak spot has one-tap links to your notes page, concept videos, recall cards, brain dumps, note sheet and key, Atlas card, Loop, and that module's practice exam. "Practice it now" builds a short set across modes.

**Course tool icons.** Today, Practice and My weak spots each show icons for:
- Recall cards and Brain dumps
- Mastery Check and Practice exam (for the current module)
- Digital Atlas and the Loops app
- Notes and materials

**Private ID plus PIN.**
- The ID is still random, so it can never contain a name.
- At setup the student picks a 4 to 6 digit PIN. Only a scrambled version (a SHA-256 hash) is ever stored or sent.
- A bar at the top of every screen shows their ID and has "Bring back my data with my ID", where they type their ID and PIN.
- A PIN can only be changed by someone who knows the current one.

**Instructor dashboard (instructor.html).**
- **Students table:** each private ID with last active date, days active in the last 7 and 30 days, attempts, focus minutes, overall score and which tools they use.
- **Class weak spots:** competencies with the lowest class score first, with how many "felt sure, missed it" answers each one has.
- **Search and export:** find a student by the ID they share with you, and download the table as a CSV.

## Set up the sheet (about 15 minutes, once)

Follow `apps-script/SETUP-EVIDENCE-SHEET.md`. In short:
1. Make a blank Google Sheet.
2. Paste Code.gs into Extensions, then Apps Script.
3. Add `ADMIN_KEY` under Script properties.
4. Run `setup`.
5. Deploy it as a web app (Execute as: Me; Who has access: Anyone).
6. Send me the /exec URL. It goes into `CONFIG.SYNC_URL` in index.html and `DEFAULT_URL` in instructor.html.

Until then, everything works but saves only on the student's device.

## Things I found on your site that you may want to fix

1. **The week pages' "Mastery Check" button opens the physiology exam.** `week-01` to `week-09.html` link to `practice-exam.html?week=N`, which is the BIO 005 practice exam. They probably should point to `bio004-mastery-check.html`.
2. **Loops results never reach the current Fall 2026 Mastery OS.** `mastery-evidence.js` reads `loopScores_v1`, but the Loops app writes `loopsEngine_v1`. The new hub reads the right key.
3. **Tissues II Loop has no competency tags** in `loops-index.js`. The hub uses the Tissues Loop's competencies for it.
4. **Some Loops can't credit a competency yet.** Station results are matched to competencies with your own structure-name rules from `atlas-competency-map.js`. That covers 458 of 1,003 stations. The bone, skull, spine, introduction and neuro Loops have no rules yet, so their rounds count as practice only. Adding rules for those Atlas pages (the same way you did for heart and muscles) fixes them for both the Atlas and Mastery OS.
5. **Practice exam scoring overcounts.** When a topic maps to several competencies, every one of them gets the item's full credit. The free-response part never reaches the shared log at all.
6. **Modules 1 to 3 note sheets have no keys.** With "Your drawing should show" pages for those modules, like the Module 4 and 5 keys, every drawing in the hub would use your note sheets.
7. **Study hours don't match.** The spec's grade targets (A 20, B 16, C 14 hours a week) differ from what you tell BIO 004 students: about 15 to 17 hours for a C, and 25 to 26 for most A and B students. Tell me which numbers to use.

## Still open from before

- The DOK review. `dok-review.html` was rebuilt for the new card bank. It now holds 2,150 flagged items across both courses, and 4,381 confident placements disagree with the existing levels.
- Physiology still uses the hub's own modes. Its recall cards and drawing checklists are not attached yet.

## Rebuilding the anatomy links after your pages change

```
node tools/build-anatomy-data.js <new-build-bio4-solano folder> <atlas map json> mos-anatomy-data.js <loops content js>
```

This rereads your note sheets, keys, notes pages, Loops and Atlas rules.
