# Setting up the evidence record sheet

About 15 minutes, once.

1. Go to sheets.google.com and create a blank sheet. Name it "Mastery OS evidence record".
2. In the sheet, open Extensions, then Apps Script. Delete the starter code, paste in all of `Code.gs`, and save.
3. Click the gear icon (Project Settings). Under Script properties, choose Add script property:
   - Property: `ADMIN_KEY`
   - Value: a long passphrase only you know. The instructor dashboard asks for it.
4. Back in the editor, pick `setup` in the function menu at the top and press Run. Approve the permissions; the script only touches this one sheet. The tabs appear: evidence, sessions, reflections and profiles. A log tab appears the first time a row is rejected.
5. Choose Deploy, then New deployment, and pick the type "Web app".
   - Description: Mastery OS
   - Execute as: Me
   - Who has access: Anyone
6. Press Deploy and copy the Web app URL. It ends in `/exec`.
7. Paste that URL into the chat. It goes into `SYNC_URL` in index.html and `DEFAULT_URL` in instructor.html. Students never see it.

## What each tab holds

| Tab | One row per | Holds names? |
|---|---|---|
| evidence | attempt, per competency and DOK level, with the tool it came from | No |
| sessions | completed focus session | No |
| reflections | weekly reflection | No |
| profiles | private ID, with the scrambled PIN, grade goal and hours | No |
| log | rejected rows, for troubleshooting | No |

## Why the "Anyone" setting is safe here

- The script saves only correctly shaped rows. There is no column for a name, email or student number.
- Bringing a student's data back needs their ID and the scrambled form of their PIN. A wrong pair gets nothing.
- Nobody can change a PIN without knowing the old one.
- Usage numbers and class weak spots need your ADMIN_KEY.
- The same attempt sent twice is saved once.
- Text starting with `=`, `+`, `-` or `@` is stored as plain text, so nobody can slip a formula into your sheet.

## Why this makes student data more stable

Without the sheet, a student's record lives only in their browser. Clearing the browser, switching devices, Safari's habit of clearing sites that haven't been visited in about a week, or opening Mastery OS inside Canvas instead of its own tab can each leave them with an empty or separate copy. With the sheet, every attempt is copied to your Google Sheet as it happens. The ID and PIN bring the whole record back on any device.

## Changing the script later

Choose Deploy, then Manage deployments, edit the existing deployment, and pick "New version". The URL stays the same.

## Helping a student with their data

Open instructor.html, type the ID they shared, and you'll see their activity. To see their raw rows, search the evidence tab for the same ID.
