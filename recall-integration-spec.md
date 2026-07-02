# Spaced Recall to Mastery OS Integration Spec

How your spaced-recall engine talks to Mastery OS. No backend required. Both pages live on the same GitHub Pages origin, so they share one browser store and can talk through it.

## The idea

1. Every recall card (or deck) is tagged with a competency ID from `competency-tags.md`.
2. When a student reviews a competency, the recall engine writes a small record to a shared `localStorage` key.
3. Mastery OS reads that key and updates the competency's mastery, last-reviewed, and next-recall. It re-reads live when the recall page writes, so the two stay in sync across tabs.

## The shared store

- **Key:** `bio004-progress`
- **Value:** a JSON object keyed by competency ID.

```json
{
  "cv-coronary": {
    "reviewedAt": "2026-07-05",
    "nextRecall": "2026-07-08",
    "attempts": 6,
    "correct": 5,
    "strength": 0.78
  },
  "resp-larynx": {
    "reviewedAt": "2026-07-05",
    "nextRecall": "2026-07-09",
    "attempts": 4,
    "correct": 2,
    "strength": 0.45
  }
}
```

### Fields

| Field | Type | Required | Meaning |
|-------|------|----------|---------|
| `reviewedAt` | ISO date `YYYY-MM-DD` | yes | When this competency was last reviewed |
| `nextRecall` | ISO date `YYYY-MM-DD` | recommended | When it is next due, from your spacing algorithm |
| `attempts` | integer | optional | Total cards answered for this competency |
| `correct` | integer | optional | Total answered correctly |
| `strength` | number 0 to 1 | optional | Your engine's retention estimate, if it has one |

Your spacing engine owns `reviewedAt` and `nextRecall`. Mastery OS trusts them for the "due today" logic and the daily build.

## How Mastery OS uses each field

- `reviewedAt` sets the competency's last-reviewed date.
- `nextRecall` sets the next-recall date (drives what shows as due, and the review portion of the daily build). If omitted, the OS schedules its own.
- Mastery is set from `strength` if present (`mastery = round(strength * 100)`), else from `correct / attempts`, else left as is. Recall is one input to mastery; drawing, cadaver ID, and the other evidence methods also move it.
- Confidence is derived from mastery (high at 75+, medium at 50+, low below).

## Writing it (recall engine side)

Two options.

**A. Write the store directly** after each card, merging into the existing object:

```js
function recordRecall(id, wasCorrect, nextRecallISO, strength){
  var store = JSON.parse(localStorage.getItem('bio004-progress') || '{}');
  var e = store[id] || { attempts:0, correct:0 };
  e.attempts += 1;
  if (wasCorrect) e.correct += 1;
  e.reviewedAt = new Date().toISOString().slice(0,10);
  if (nextRecallISO) e.nextRecall = nextRecallISO;
  if (strength != null) e.strength = strength;
  store[id] = e;
  localStorage.setItem('bio004-progress', JSON.stringify(store));
}
```

**B. Write once per deck/session** with the summary stats. Same shape, one write at the end.

Either way, tag the card/deck with the competency ID and call it. That is the whole contract.

## Reading it (Mastery OS side, already wired)

On load, and again whenever `bio004-progress` changes in another tab (the browser `storage` event) or the OS tab regains focus, Mastery OS ingests the store and re-renders. So a student can do recall in one tab and watch the dashboard, daily build, and weakness list update when they switch back, with no refresh.

## Gap Finder upgrade (later)

Once cards carry competency IDs and a question format, the Gap Finder can pull real questions per competency instead of the cold self-check, making the diagnosis objective. That is a follow-on; the store contract above does not need to change for it.

## Tagging reference

See `competency-tags.md` for every competency ID by week.
