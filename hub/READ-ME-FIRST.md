# Mastery OS hub, October 17 evening update

This drop goes in the `hub` folder of your mastery-os repo. It holds only the files that changed since the afternoon drop.

## What changed

- **Connected to your Google Sheet.** index.html now sends every attempt, focus session, reflection and profile to your Apps Script web app. instructor.html opens with the same address filled in. You still type your ADMIN_KEY there yourself.
- **Your study hours for anatomy.** Anatomy students now see your numbers: about 25 to 26 hours a week for an A or B, and about 15 to 17 for a C. Physiology keeps the spec's targets (20 or more, 16, 14) until you tell me otherwise.
- **Loops credit each station to its own competency.** 982 of 1,003 stations now count toward a competency. The other 21 count as practice only.
- **mos-loop-rules.js (new).** Your editable list of matching rules for the Loops stations the Atlas does not cover yet.

## Corrections to the afternoon READ-ME

- The week-01 to week-09 "Mastery Check" buttons are fine. Those are BIO 005 pages, so they should open the physiology exam.
- The current Mastery OS page (mastery-os-fall-2026.html) did read Loops results before, but it credited every station to every competency in that Loop. The separate Loops fix drop for your anatomy repo corrects that.

## Good to know

- Only this new hub sends data to the sheet. The current Mastery OS page in your anatomy repo still saves on the student's device only.
- To check that the sheet is working, open the hub, finish setup with a test name, and do one flashcard. A row should show up in the evidence tab within a minute. You can delete those test rows afterward.

## Rebuilding the anatomy links after your pages change

```
node tools/build-anatomy-data.js <new-build-bio4-solano folder> <atlas map json> mos-anatomy-data.js <loops content js> <new-digital-atlas folder>
```
