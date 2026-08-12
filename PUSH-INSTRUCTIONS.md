# Push instructions, batch 1

Four files. All four go to the **root** of `drsrennie-stack/new-build-bio4-solano`, replacing what is there now. They are drop-in replacements, same filenames, no renaming.

## How to push

1. Go to `github.com/drsrennie-stack/new-build-bio4-solano`
2. **Add file → Upload files**
3. Drag all four in at once
4. Commit to `main`
5. Wait about a minute for Pages to rebuild, then hard-refresh (Cmd+Shift+R)

## The four files

| File | Replaces | What changed |
|---|---|---|
| `competenciesfall2026.js` | same file | Lymphatic and endocrine regrouped |
| `resources.js` | the empty stub | Module 1 fully mapped, plus your Week 3 work recovered |
| `mastery-os-fall-2026.html` | same file | Palette, Games card, YouTube fix, canvas link |
| `mastery-canvas.html` | same file | Now records drawing evidence |

## Test after pushing, in this order

Open `https://drsrennie-stack.github.io/new-build-bio4-solano/mastery-os-fall-2026.html`

1. **Colors.** Headers should be your navy `#1E3D4C`, accents terra `#C2734D`, gold `#B8924A`. No cream anywhere. If it still looks near-black and dark red, you got a cached copy, hard-refresh again.
2. **Competency Map.** Set the week to 11. You should see respiratory, the three lower-limb lab muscle groups, lymphatic, and endocrine together. Week 13 should no longer show lymphatic. Week 16 should no longer show endocrine.
3. **Study Together.** Two cards now: Study With Me, and a Games card marked **Coming soon** with a disabled button.
4. **Resources.** Go to any Module 1 competency, for example Anatomical planes and sections. You should get real buttons: Watch concept video, Lab sprint, Lab ID loops, Spaced recall, Notes. Before this push you got the generic fallback.
5. **Pomodoro sound.** Start a Pomodoro. Paste a YouTube link, click Save link as Lo-fi. It should play. If it does not, you now get a plain-English reason instead of silence. See the YouTube section below.
6. **Drawing evidence.** From a competency, click Draw on canvas. At the bottom of the canvas there is now a scoring bar: Patchy, Solid, Thorough. Click one, then go back to Mastery OS and check the Weakness Dashboard.

---

## What changed, in detail

### 1. Lymphatic and endocrine regrouped

Both now sit in **week 11**, taught before GI, inside the GI and Lower Extremity module (Module 4, weeks 11 to 13).

| Competency | Was | Now |
|---|---|---|
| `w4-lymph-pathway` | week 13 | week 11 |
| `w4-lymph-vessels-node` | week 13 | week 11 |
| `w4-lymphatic-organs` | week 13 | week 11 |
| `w4-lymphatic-disorders` | week 13 | week 11 |
| `w6-endocrine-locate` | week 16 | week 11 |
| `w6-pituitary` | week 16 | week 11 |
| `w6-thyroid-parathyroid` | week 16 | week 11 |
| `w6-adrenal` | week 16 | week 11 |
| `w6-endocrine-tissue-organs` | week 16 | week 11 |

**Because you said there is no lab for these**, I removed the `cadaver`, `label` and `imaging` facets from all nine. Those three facets are what put a competency into lab retrieval, so lab stations will no longer schedule them. `lecture`, `draw` and `clinical` were kept.

**One thing to confirm.** I kept the `histology` facet on four of them: `w4-lymph-vessels-node`, `w6-pituitary`, `w6-thyroid-parathyroid`, `w6-adrenal`. Those are slide-based, and I read "no lab" as "no cadaver station" rather than "no slides." If you show those slides in lecture rather than lab, this is correct and you can ignore this. If you want histology gone from them too, say so and it is a one-line change.

Module counts after the move:

- Module 4 (weeks 11 to 13): 34 → **39** competencies
- Module 5 (weeks 14 to 17): 70 → **65** competencies

That is a real improvement. Module 5 was the most overloaded block in the course.

### 2. Games parked behind one Coming soon card

Study Together used to show six cards. Five of them (Live Quiz, Practice TBL, Lab Races, Escape Room, Draw and Guess) ran on 25 hardcoded demo questions total, which would have been visibly thin to students in week one.

Now there are two cards: **Study With Me** (unchanged, still links to your hosting schedule) and a single **Games** card tagged "In development" with a Coming soon badge and a disabled button.

**Nothing was deleted.** Every game function is still in the file, untouched. When you are ready after the semester starts, re-enabling them is putting the entries back in the `MODES` array. The comment in the file says exactly that, at the array.

### 3. Palette repainted to the PRIMARY system

The app had drifted well off spec. This was not a small drift:

| Token | Was | Now |
|---|---|---|
| Navy | `#08101F` (near-black) | `#1E3D4C` |
| Terra | `#8B1D1D` (dark red) | `#C2734D` |
| Gold | `#C9A14A` | `#B8924A` |
| Cream | `#F5F1E8`, 37 uses | removed |

Cream was in there 37 times, which breaks your standing rule that sage and cream are out of the teaching system. Cream backgrounds became white, cream text became off-white, so contrast is preserved or improved everywhere.

I also added `--navy-deep` and `--navy-tint`, which the palette defines but the app never had, and loaded **Lora** so `--serif` is a real serif instead of silently falling back to Plus Jakarta Sans.

Hardcoded hex values scattered through gradients, inline styles and SVG icons were swept too, 30 of them, so the repaint is complete rather than variable-deep only.

### 4. The Pomodoro YouTube player

**Why it was not working.** The player was built lazily, on your first click. Building it requires loading YouTube's iframe API over the network, so `playVideo()` ran a second or more after your click. By then the browser no longer counts it as a user gesture, and autoplay policy blocks unmuted playback. Worse, every failure path was wrapped in an empty `catch(e){}` and there was no `onError` handler, so a blocked track, a private video, and an embed-disabled video all looked identical: nothing happens, no message.

**What changed:**

- The player is now built **once, early**, as soon as the Pomodoro sound row renders. By the time you click a chip, it is ready, so playback starts inside your click and the browser allows it.
- `onError` is handled and translated. You now get, in plain language: not a valid link, cannot be embedded, private or deleted, or **the owner blocked embedding**. That last one is the most common real cause. A lot of lo-fi and study-music channels disable embedding, and there is nothing any site can do about it.
- If autoplay is still blocked, after two seconds you get "Your browser blocked autoplay. Tap the sound chip once more and it will start." Tapping again works, because the player is warm.
- If youtube.com is blocked outright by an extension, a campus network, or a browser setting, you are told that instead of getting silence.
- Added `origin` to the player params and an explicit `unMute()` before play.

**If it still fails after this push**, the message will tell you which of those it is. Two things worth knowing: Green noise is generated in the app with Web Audio and never depends on YouTube, so it always works; and a **playlist** link is more reliable than a single video, because if one track blocks embedding the player moves to the next.

### 5. Drawing on the canvas now counts

`mastery-canvas.html` had no storage call of any kind. A student could draw there and produce zero evidence, while the same drawing scored through `bio004-draw.html` counted. Half the drawing traffic went nowhere.

Mastery OS now opens the canvas with `?comp=<competencyId>`, and the canvas has a scoring bar at the bottom: Patchy, Solid, Thorough. It writes one row to `bio004-evidence-v1` in the exact shape `mastery-evidence.js` reads, `{comp, source:'draw', got, of, at}`, so it lands on the Weakness Dashboard alongside cards and Loops.

If the canvas is opened without a competency id, no bar appears and nothing is written. Opening it as a plain scratch pad still works exactly as before.

### 6. resources.js, the Module 1 unlock

This is the one that changes what students actually experience.

The repo copy was an **empty stub**, 0 of 196 competencies mapped, so every "what do I do now" button fell through to generic text. All 23 Module 1 competencies are now mapped to real pages: notes, worksheet, lab sprint, Loom video, Loops, spaced recall, and the module structure list.

I also **recovered the 13 Module 3 entries** from the working copy in your Mastery OS project folder, including the Loom chapter start times for heart, respiratory and blood vessels. That work existed only on your local disk and was not in the repo. It is now.

Every URL was checked against the actual repo file list. Zero dead links.

Two honest limitations, both documented in the file header:

- **Module 1 Loom links open at 0:00.** The Module 1 concept-video pages do not carry `data-s` chapter marks the way the heart, respiratory and vessel pages do. Once you add chapters, adding `?t=SECONDS` here is a one-line change per competency.
- **There is no cavities worksheet.** The five cavity competencies point at the intro worksheet, which is where the cavities drawings M1-2 and M1-3 actually live.

Coverage now: **36 of 196** competencies, up from 0. Modules 2, 4 and 5 are still unmapped, which is the next batch.

---

## Answering your other question directly

You asked whether anything from the rebuild worked more accurately with data, or had design updates worth bringing into the more complete build.

**On the code: no, nothing.** I compared every function in all three copies. `mastery-os-fall-2026.html` has 258 functions, the rebuild has 223, and the rebuild's set is a strict subset. There is not one function in the rebuild that is missing from the fall build. The fall build adds 35, including the whole evidence layer, the loops aggregation, the plan wizard, the AI tutor screen, and the card-to-competency ingest. Nothing to port back.

**On data: yes, two files, and both are now handled.** Your local `resources.js` and `rubrics.js` had real content that the repo versions had been reduced to empty stubs. `resources.js` is merged and shipping in this batch. `rubrics.js` I deliberately left alone, because the fall app now falls through to the 69 drawing checklists when a rubric is missing, so your 13 Week 3 rubrics would add very little and the checklists are richer. Say the word if you want them merged anyway.

**On design: yes, and it went the wrong direction.** The rebuild had your correct terra `#C2734D`. The fall build changed it to `#8B1D1D`, a dark red. So the newer, more complete build was actually further off palette than the older one. That is fixed in this batch, along with cream and the navy.

---

## What is next, in priority order

1. **Games on the real bank.** The one that converts 25 demo questions into 2,020 real ones. You said you want to think about this after the semester starts, so it is parked correctly.
2. **Gap Finder on real questions.** Same loader as the games. Right now it is a cold self-rating, so the diagnosis feeding your cram plans and Weakness Dashboard is subjective.
3. **resources.js for Modules 2, 4 and 5.** Mechanical, same pattern as Module 1. Module 2 next, since it is the second exam.
4. **The Mastery OS repo split.** Worth doing, and safe: all your Pages sites share the origin `drsrennie-stack.github.io`, so student progress in localStorage survives the move. The only thing that would break it is putting a custom domain on one repo and not the other.
5. **compliance-notes.md** for the repaint. The palette change altered contrast on every surface and should be re-audited before it counts as done.
