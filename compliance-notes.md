# Compliance notes

## 1. Project, files, date

- Project: Mastery OS, new design (Framework Spec, Draft 2)
- Files covered: index.html, instructor.html, dok-review.html (and its template), mos-dok-rubric.js, mos-loops-anatomy.js, mos-anatomy-data.js
- Date: September 29, 2026; updated October 17, 2026 (ID and PIN bar, Weakness Dashboard, course tool icons, mounted recall and brain dump engines, instructor dashboard)

## 2. WCAG version and level

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level reached | How |
|---|---|---|
| 1.1.1 Non-text content | AA | Logo is decorative (aria-hidden). Loop images have alt text naming the station and how many structures to identify; answer images name the labeled structures. The drawing canvas has an accessible name and paper is offered as the equal alternative. |
| 1.3.1 Info and relationships | AA | Landmarks (banner, nav, main), one h1 per view, h2 and h3 in order, fieldset and legend for every choice group, label for plus id on every input, table headers with scope and captions. |
| 1.4.3 / 1.4.6 Contrast | AAA for body text | See section 3. |
| 1.4.10 Reflow | AA | Works at 320 px wide; tables scroll sideways inside a focusable region; the header stops being sticky on phones. |
| 1.4.11 Non-text contrast | AA | Focus ring #8A6A2E is 5.0:1 on white. Inputs have 1 px borders plus a focus ring. |
| 2.1.1 Keyboard | AA | Every control is a real button, link, input or select. Confidence uses native radio buttons (arrow keys), plus keys 1 to 5 on flashcards. |
| 2.1.2 No keyboard trap | AA | Dialogs and the setup trap Tab inside while open, Escape closes dialogs, and focus returns to the control that opened them. |
| 2.4.1 Bypass blocks | AA | Skip link to main content. |
| 2.4.3 Focus order | AA | Focus moves to the new heading on every screen change and to the revealed answer after each check. |
| 2.4.7 / 2.4.11 Focus visible, not obscured | AA | 3 px outline with 2 px offset on everything. The focus timer can be folded or dragged if it covers something. |
| 2.5.7 Dragging movements | AA | Dragging the timer is optional; the fold button does the same job. Drawing on screen is optional; paper is the default. |
| 2.5.8 Target size | AA | Buttons and choices are at least 36 px tall, most 44 px. |
| 3.3.1 / 3.3.3 Error identification and suggestion | AA | Plain messages in role="alert" say what is missing and move focus to it. |
| 4.1.2 Name, role, value | AA | aria-pressed on toggles, aria-expanded on the timer fold button, aria-modal dialogs with labels, role="progressbar" with values on the weekly meter. |
| 4.1.3 Status messages | AA | aria-live regions for pace, sync status, checklist counts, timer changes, and saved messages. |
| 2.3.3 Animation from interactions | AAA | prefers-reduced-motion turns off every transition and hover lift. |

## 3. Color contrast audit

Palette: Mastery OS very dark navy #08101F (the Fall 2026 build), navy-deep #050A14, brushed gold #B8924A, terra cotta #C2734D, terra-dark #A0522D, off-white #FAFAF9. No teal.

| Pair | Colors | Ratio | Result |
|---|---|---|---|
| Navy text on white card | #08101F on #FFFFFF | 19.02:1 | Pass AAA |
| Navy text on page | #08101F on #FAFAF9 | 18.21:1 | Pass AAA |
| Secondary text on white | #2A3949 on #FFFFFF | 11.80:1 | Pass AAA |
| Secondary text on page | #2A3949 on #FAFAF9 | 11.30:1 | Pass AAA |
| Eyebrow and h2, terra-dark on white | #A0522D on #FFFFFF | 5.62:1 | Pass AA |
| Terra-dark on page | #A0522D on #FAFAF9 | 5.38:1 | Pass AA |
| "Not yet" cells, gray on white | #5A6170 on #FFFFFF | 6.22:1 | Pass AA |
| White on navy buttons | #FFFFFF on #08101F | 19.02:1 | Pass AAA |
| White on terra-dark button | #FFFFFF on #A0522D | 5.62:1 | Pass AA |
| Navy on navy-tint (answers, completed state) | #08101F on #EEF0F4 | 16.67:1 | Pass AAA |
| Secondary text on navy-tint | #2A3949 on #EEF0F4 | 10.34:1 | Pass AAA |
| Setup text on very dark navy | #E6ECEF on #08101F | 15.95:1 | Pass AAA |
| Navy text on gold setup buttons | #08101F on #B8924A | 6.56:1 | Pass AA |
| Timer label on navy-deep | #E3CFA4 on #050A14 | 12.95:1 | Pass AAA |
| Setup error message on navy | #FFD9C7 on #08101F | 14.49:1 | Pass AAA |
| Focus ring on white (non-text) | #8A6A2E on #FFFFFF | 5.02:1 | Pass |

Brushed gold #B8924A is used only for borders, the unlocked state, and the focus ring on dark backgrounds, never for text on white (it is 2.90:1 there).

## 4. Keyboard navigation flow verified

Setup: every step reachable, Enter advances, Back works, the ID step keeps Finish off until "I wrote my ID down" is ticked. Today: skip link, course picker, focus timer, nav, then content in reading order. Every mode run from start to save with the keyboard alone in automated tests: flashcards, exam engine (hint, retry, reveal, reasoning score), brain dump, draw it to know it, Loops. Dialogs (focus timer, baseline finder, start over) trap focus and close with Escape.

## 5. Screen reader testing

Automated: axe-core 4 (WCAG 2.0 A and AA, 2.1 AA, 2.2 AA rules) run in headless Chromium on setup, Today, review tasks, the exam reveal, checklists, the weekly reflection, My progress, the coach, My ID and settings, Practice, the flashcard and Loops pickers, the focus timer dialog, the start over dialog, and dok-review.html. Result: no violations after fixes (two were found and fixed: sideways-scrolling tables were not focusable, and the gray "Not yet" cells were 4.4:1).

Not yet done: a manual pass with VoiceOver on macOS and iOS, and NVDA on Windows. That needs a person.

## 5b. October 17 additions

- The private ID bar at the top of every screen is a disclosure button with aria-expanded and aria-controls. Its form has labeled ID and PIN fields, and its status line is aria-live.
- PIN fields are type="password" with inputmode="numeric". Errors are written out in plain words.
- Course tool icons and Fix it links are real links with visible text labels. Their icons are aria-hidden. Same-site links use target="_top", and external links (Atlas) use target="_blank" rel="noopener".
- The Weakness Dashboard uses a list of cards with headings in order. Status is given in words, never by color alone.
- instructor.html has labeled fields, tables with captions and scoped headers, and an aria-live load status.
- axe-core rerun (WCAG 2.0 A/AA, 2.1 AA, 2.2 AA) on setup with PIN, Today, My weak spots, the note sheet prompt picker, the ID bar, My ID and settings, Practice, My progress, Weekly reflection, Coach, and instructor.html. No violations.
- The recall card and brain dump engines are Dr. Rennie's own recall-view.js and braindump-view.js, mounted as they are. They were left out of this axe run, because their markup belongs to those files and was not changed here.

## 6. Known limitations and remediation plan

- Manual screen reader pass still to do (see above).
- Loop images come from the Loops app and have generic alt text. A student using a screen reader cannot do the Loops mode by image; the other four modes cover the same competencies. Longer term, text descriptions per station would close this.
- The optional on-screen drawing canvas cannot be used without a pointer. Paper is presented as the main way to draw, and the checklist works the same either way.
- The mounted recall and brain dump engines need their own accessibility pass in their source files.
- Fonts load from Google Fonts; if blocked, the system font takes over with no loss of function.

## 7. Reviewer

Built and tested by Claude (Cowork) for Dr. Sharilyn Rennie. Awaiting Dr. Rennie's review.
