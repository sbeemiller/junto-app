# Owner-only Sheet preview

Read-only Apps Script proof of concept. Separate from the public GitHub Pages demo. No roster or real meeting data is bundled in these source files.

- Deploy with `access: MYSELF` and `executeAs: USER_DEPLOYING`.
- `requireOwner_` also checks the server-observed Google account before reading data.
- A private deployment file named `Config.gs` supplies `JUNTO_CONFIG` with `ownerEmail` and `spreadsheetId`. Keep it outside this public repository.
- Build `Style.html` from the current app CSS and replace local landscape URLs with a neutral background, so the standalone preview needs no external assets.
- The server reads the existing Sheet through the advanced Sheets API with the existing read-only scope. There are no save functions.
- Frontend rendering escapes Sheet text and accepts only HTTPS source links.
- The public demo’s local data is neither imported nor mixed into the Sheet.

Member access and edits are not implemented in this owner-only test. Do not change the deployment to allow anyone or all Google users without designing and testing member authorization first.

Build with `node private-preview/build.mjs /absolute/tmp/output` after supplying `JUNTO_OWNER_EMAIL` and `JUNTO_SHEET_ID` in the ignored `.env.local`. Local script/deployment IDs are recorded there too. No new dependencies are required.

Run the authorization checks with `node tests/private-preview.cjs`. Google authorization and a successful live Sheet read must still be verified before calling the preview connected.
