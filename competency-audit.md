# BIO 004 Competency Audit and Time-Budget Model

Dr. Sharilyn Rennie. Working framework for the Mastery OS competency engine.

## Purpose

Competencies are audited per unit from the master structure list (`anatomy-structure-list-systems.html`), not from a fixed template, because each week's content differs. Every competency is rated for yield and estimated for time so the OS can pack a student's weekly budget with the highest-yield work first, then layer in spaced review of earlier units.

## Weekly time budget by grade goal (outside class)

| Grade goal | Weekly hours |
|-----------|--------------|
| A | 20 h |
| B | 16 h |
| C to pass | 14 h |

The budget is not one lump. It splits two ways:

1. **New competencies** for the current unit, worked highest-yield first.
2. **Review and repetition** of earlier units, carried mainly by spaced-recall cards and the loops.

Early in the term the split leans new; as units accumulate, review grows. The OS never lets review crowd out the current unit, and never lets a new unit bury the review that keeps earlier material durable.

## Yield tiers

- **Core.** Must know, heavily tested, foundational. Highest bang for the buck. Done first, by everyone.
- **High.** Frequently tested and important. Done after Core, fits comfortably in a B or A week.
- **Support.** Detail and lower-frequency material. Done if time allows, the first thing trimmed in a C-to-pass week.

## Time estimates

Each competency carries an estimate of the minutes to reach mastery through the cycle (see it, retrieve it, apply it, prove it), not just to read it once. Estimates are deliberately conservative so the budget stays honest.

## How the engine uses this

1. Rank the current unit's competencies: Core, then High, then Support.
2. Fill the student's new-competency time, highest yield first, biased toward their preferred activities.
3. Fill the review time with spaced-recall cards and loops from earlier units that are due.
4. Anything that does not fit is clearly shown as trimmed, not hidden, so the student knows what they skipped and why.

## Week 3 audit (sample), Cardiovascular, Respiratory, Regional BV/N 1

| Competency | System | Yield | Est |
|-----------|--------|-------|-----|
| Heart chambers and septa | Cardiovascular | Core | 45 |
| Heart valves | Cardiovascular | Core | 40 |
| Coronary circulation | Cardiovascular | Core | 45 |
| Tracheobronchial tree | Respiratory | Core | 35 |
| Lungs, lobes, and fissures | Respiratory | Core | 40 |
| Great vessels and aortic arch | Regional BV/N 1 | Core | 50 |
| Blood vessel tunics | Regional BV/N 1 | Core | 35 |
| Vessel type identification | Regional BV/N 1 | Core | 40 |
| Heart surfaces and borders | Cardiovascular | High | 30 |
| Pericardium | Cardiovascular | High | 25 |
| Upper airway | Respiratory | High | 35 |
| Respiratory histology | Respiratory | High | 30 |
| Pleurae and pleural cavity | Respiratory | High | 25 |
| Capillary types | Regional BV/N 1 | High | 25 |
| Conduction landmarks | Cardiovascular | Support | 20 |
| Pulmonary vs bronchial vessels | Regional BV/N 1 | Support | 20 |

Totals: Core 5.5 h, High 2.8 h, Support 0.7 h. Full new-competency load about 9.0 h.

### How Week 3 packs into each budget

| Grade | New competencies | Review and repetition (recall cards + loops) |
|-------|------------------|----------------------------------------------|
| A, 20 h | All 9.0 h (Core + High + Support) | ~11 h: Weeks 1 to 2 recall, loops, drawing, TBL prep, lab-sprint reps |
| B, 16 h | ~8.3 h (Core + High) | ~7.7 h review and repetition |
| C to pass, 14 h | ~5.5 h (Core, plus essential High) | rest on review, focused on clearing the bar |

## Repetition, where loops and spaced recall come in

New competencies are learned in the current unit. Once learned, they move into the review stream: spaced-recall cards schedule the return, and the loops give image-sequence repetition. So a student is always doing a little new and a lot of returning, which is what makes it stick. The OS surfaces due reviews automatically and lets the student also pick a weak area to review on demand.

## Honesty and limits

This audit selects the highest-yield subset of a much larger testable list. It is a study aid, not the syllabus. Students are told, in the app, that it cannot cover everything and does not guarantee a grade, and to cross-check the structure list.

## All weeks audited

Weeks 1 through 8 are now audited in `competencies.js` from the master structure list, each competency tagged Core, High, or Support with a time estimate. Approximate new-competency load per week:

| Week | Focus | Competencies | New-work hours |
|------|-------|--------------|----------------|
| 1 | Foundations, Tissues, Integumentary | 11 | ~5.7 h |
| 2 | Skeletal | 10 | ~6.6 h |
| 3 | Cardiovascular, Respiratory, BV/N 1 | 13 | ~7.6 h |
| 4 | Muscle, Upper limb, Lymphatic, Blood, BV/N 2 | 10 | ~5.6 h |
| 5 | Digestive, Abdominopelvic, Lower limb, BV/N 3 | 10 | ~6.2 h |
| 6 | Urinary, Reproductive, Endocrine | 6 | ~3.6 h |
| 7 | Head/neck muscles, CNS brain, CSF, Meninges | 7 | ~4.1 h |
| 8 | Spinal cord, Peripheral and cranial nerves, Integration | 7 | ~3.8 h |

New-work hours are the focused competency time. The rest of each grade budget (A 20 h, B 16 h, C 14 h) goes to spaced review of earlier weeks via loops and recall cards, lab-sprint reps, drawing, and TBL prep. Week 8 is lighter on new material because it is cumulative review and exams.

Respiratory (Week 3) covers larynx, trachea and bronchial tree, lungs and pleura, and the thoracic wall and diaphragm, matching the structure list even where a lab sprint was thin.

## Next step

Wire the budget engine into the app so the plan packs new competencies by yield into the grade budget and layers in due reviews from the loops and spaced-recall cards.
