# Compliance notes: Mastery OS, next-semester build

## 1. Project, files, date

- Project: Mastery OS (one hub for BIO 004 Human Anatomy and BIO 005 Human Physiology)
- Files covered: `index.html`, `mastery-config.js`
- Date: September 29, 2026

## 2. WCAG version and level achieved

Target: WCAG 2.2 AA minimum, AAA where achievable.

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text content | A | Pass. No informative images. The progress meter has role="img" with a text label; the decorative spinner and progress bars are aria-hidden. |
| 1.3.1 Info and relationships | A | Pass. Landmarks (header, nav, main, footer, aside), one h1 per screen, h2/h3 below it, tables with caption and scope, fieldset and legend on every radio group, label for every input. |
| 1.3.2 Meaningful sequence | A | Pass. DOM order matches visual order. |
| 1.4.1 Use of color | A | Pass. Strength cells show a percent and a word (Weak, Getting there, Strong). Right and wrong answers carry "Correct answer" and "Your pick" tags, not color alone. |
| 1.4.3 Contrast (minimum) | AA | Pass. Every text pair is 5.38:1 or higher (table below). |
| 1.4.6 Contrast (enhanced) | AAA | Partial. Everything reaches 7:1 except terra-dark eyebrows and subheads (5.38 to 5.62:1). Those are palette colors and are kept. |
| 1.4.10 Reflow | AA | Pass. Tested at 390 px: no horizontal page scroll. Wide tables scroll inside their own box. |
| 1.4.11 Non-text contrast | AA | Pass. Input borders #6B7780 (4.59:1), focus ring terra-dark (5.62:1), sand focus ring on navy in setup (7.83:1). The gold border on mode tiles is decorative; each tile is identified by its text. |
| 1.4.12 Text spacing | AA | Pass. No fixed-height text containers. |
| 1.4.13 Content on hover or focus | AA | Pass. Nothing appears on hover alone. |
| 2.1.1 Keyboard | A | Pass. Every control is a native button, link, input, select, or details/summary. |
| 2.1.2 No keyboard trap | A | Pass. Dialogs are native `<dialog>` opened with showModal; Escape closes them. |
| 2.2.1 Timing adjustable | A | Pass. No time limits. The focus timer is student-started, can pause, reset, and change every length. |
| 2.3.3 Animation from interactions | AAA | Pass. prefers-reduced-motion turns off every transition and animation. |
| 2.4.1 Bypass blocks | A | Pass. Skip link to main. |
| 2.4.2 Page titled | A | Pass. Title names the app, course, and term. |
| 2.4.3 Focus order | A | Pass. On screen change focus goes to the new h1; in setup it goes to the single input, or to the question heading; in the player it goes to the question. While setup is open, everything behind it is inert. |
| 2.4.6 Headings and labels | AA | Pass. Setup questions are the input labels. |
| 2.4.7 Focus visible | AA | Pass. 3 px outline on every focusable element. |
| 2.4.11 Focus not obscured (minimum) | AA | Pass. The focus timer sits in the corner, folds to a small puck, and does not cover dialog content. |
| 2.5.3 Label in name | A | Pass. Icon-only buttons (close, timer fold) have aria-labels; the fold button also has aria-expanded. |
| 2.5.8 Target size (minimum) | AA | Pass. Buttons and chips are at least 36 px, most 44 px. |
| 3.1.1 Language of page | A | Pass. lang="en". |
| 3.2.2 On input | A | Pass. Filters re-render but keep focus on the control that changed. |
| 3.3.1 Error identification | A | Pass. Setup errors in a role="alert" line; practice and settings errors in aria-live hints. |
| 3.3.2 Labels or instructions | A | Pass. |
| 3.3.7 Redundant entry | A | Pass. Nothing is asked twice; the confidence rating carries through a drawing that leaves for the canvas. |
| 4.1.2 Name, role, value | A | Pass. aria-pressed on course and length chips, aria-current on the active tab, aria-expanded on the timer fold. |
| 4.1.3 Status messages | AA | Pass. A polite live region announces loading, switching courses, sync, and Loops results; the player announces revealed answers; the timer announces phase changes. |

## 3. Color contrast audit

| Where | Pair | Ratio | AA | AAA |
|---|---|---|---|---|
| Body text, H1, ghost buttons | #1E3D4C on #FFFFFF | 11.49:1 | Pass | Pass |
| Text on page background | #1E3D4C on #FAFAF9 | 11.01:1 | Pass | Pass |
| Eyebrow, H2, H3, blind-spot tag | #A0522D on #FFFFFF | 5.62:1 | Pass | Large only |
| Eyebrow on page background | #A0522D on #FAFAF9 | 5.38:1 | Pass | Large only |
| Muted text and hints | #4A5A63 on #FFFFFF | 7.16:1 | Pass | Pass |
| Muted text on page background | #4A5A63 on #FAFAF9 | 6.85:1 | Pass | Large only |
| Primary button, active tab, pressed chip | #FFFFFF on #1E3D4C | 11.49:1 | Pass | Pass |
| Primary button hover | #FFFFFF on #142A36 | 14.85:1 | Pass | Pass |
| Key button (Start review) | #142A36 on #E8D3A8 | 10.12:1 | Pass | Pass |
| Selected option, strong cell, table header | #1E3D4C on #EDF1F3 | 10.11:1 | Pass | Pass |
| Weak cell | #7A3A1C on #F7E9E1 | 7.22:1 | Pass | Pass |
| Wrong-answer panel text | #1E3D4C on #F7E9E1 | 9.69:1 | Pass | Pass |
| Getting-there cell | #5F4716 on #FBF4E6 | 8.00:1 | Pass | Pass |
| Hint panel text | #1E3D4C on #FBF4E6 | 10.50:1 | Pass | Pass |
| Setup heading | #FFFFFF on #1E3D4C | 11.49:1 | Pass | Pass |
| Setup body text | #E4ECEF on #1E3D4C | 9.60:1 | Pass | Pass |
| Setup hints | #DCE5E9 on #1E3D4C | 8.99:1 | Pass | Pass |
| Setup eyebrow | #E8D3A8 on #1E3D4C | 7.83:1 | Pass | Pass |
| Setup error text | #FFD9C7 on #1E3D4C | 8.76:1 | Pass | Pass |
| Setup buttons | #142A36 on #E8D3A8 | 10.12:1 | Pass | Pass |
| Private ID box | #1E3D4C on #FFFFFF | 11.49:1 | Pass | Pass |
| Input border (non-text) | #6B7780 on #FFFFFF | 4.59:1 | Pass | n/a |
| Locked mode border (non-text) | #6B7780 on #FFFFFF | 4.59:1 | Pass | n/a |
| Focus ring (non-text) | #A0522D on #FFFFFF | 5.62:1 | Pass | n/a |
| Setup focus ring (non-text) | #E8D3A8 on #1E3D4C | 7.83:1 | Pass | n/a |

Gold #B8924A is used only for borders and the progress fill, never for text. On white it measures 2.90:1, so it never carries meaning alone.

## 4. Keyboard navigation flow verified

Skip link, then course chips, then the five tabs, then screen content, then the focus timer. Setup: Get started, name (focus lands in the box, Enter continues), course and grade (Tab to the radio group, arrows to choose, Tab to Continue), hours, ID (checkbox, then Open Mastery OS). Player: confidence radios, answer radios or checkboxes, reasoning box, Submit; after a reveal, the reasoning-score radios and Next. Escape closes any dialog. Every step was driven by Playwright with keyboard and click actions at 1280 px and 390 px.

## 5. Screen reader testing

Automated: axe-core 4.x with the WCAG 2.0 A/AA, 2.1 AA, and 2.2 AA rule sets found zero violations on every screen (Today, Weakness Dashboard, Practice, My week, Settings, the practice player, the reflection dialog, and every setup step) at both 1280 px and 390 px.

Not yet done: a manual pass with VoiceOver (Safari, macOS and iOS) and NVDA (Firefox, Windows). The build has not been through a real screen reader. That pass should happen before launch.

## 6. Known limitations and remediation plan

- **Eyebrow and subhead contrast is AA, not AAA** (terra-dark 5.38 to 5.62:1). It is kept for the palette. If AAA is required, darken to #8A4424.
- **Wide Weakness Dashboard tables** scroll sideways inside their box on phones. Reflow passes, but a stacked card layout for phones would read better. Planned for the next pass.
- **Fonts** load from Google Fonts. If they are blocked, the page falls back to system fonts with no loss of content.
- **Content accessibility** depends on the course files it loads (cards, checklists, Loops). Those files have their own compliance notes.
- **Loops and the drawing canvas** are separate apps with their own compliance notes.

## 7. Reviewer

Automated audit and keyboard pass by Claude (Cowork) on September 29, 2026. Manual screen reader review pending: Dr. Sharilyn Rennie.
