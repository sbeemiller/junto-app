# Google access for Junto

## Current owner preview

The deployed Apps Script preview is restricted to its deploying owner (`MYSELF`). It verifies the server-observed Google email before reading the fixed group Sheet. The app currently requests `userinfo.email` and `spreadsheets.readonly` only. It cannot read original Drive/Docs content or write the Sheet.

Meeting metadata can be imported into the restricted Sheet through the connected Google Drive tools. The app reads those fields on refresh. This is a one-time import, not an automatic sync. Real source text, member information, Sheet IDs, and deployment configuration must stay out of the public demo and public Git history.

## Proposed ongoing imports

Use a separate owner-run Apps Script importer so a scheduled import does not require broader permissions in the viewing app. No external AI service is required to extract existing Gemini summaries, headings, suggested next steps, and transcript-tab links.

Proposed Google scopes for that importer:

| Scope | Why it is needed |
| --- | --- |
| `https://www.googleapis.com/auth/userinfo.email` | Verify the owner running the importer |
| `https://www.googleapis.com/auth/drive.metadata.readonly` | List the configured folder and resolve shortcut targets without downloading recordings |
| `https://www.googleapis.com/auth/documents.readonly` | Read existing Google Docs notes and transcript tabs |
| `https://www.googleapis.com/auth/spreadsheets` | Persist imported metadata and import history in the configured group Sheet |

These permissions are account-wide scopes, even when the code restricts itself to one folder and Sheet. Google must show the owner the authorization request. Adding a shortcut or granting a scope does not grant access to its original file: the owner must already be able to open it. File owners must share missing targets with the owner account directly or through an appropriately restricted group/folder.

Before any recurring trigger is enabled:

1. Create the standalone importer, without a public web endpoint.
2. Keep its source-folder ID, destination-Sheet ID, and owner account in private configuration.
3. Dry-run discovery and preview proposed changes. Do not log transcript text or personal details.
4. The owner reviews Google's additional permission request and approves it themselves.
5. Test one import with the approved scopes, including an inaccessible file and a duplicate shortcut.
6. Deduplicate using original file IDs. Track document revision and imported timestamp.
7. Write only blank fields or fields previously owned by the importer and unchanged since its last write. Preserve leader edits and confirmed commitments.
8. Mark Gemini content as awaiting review. Never infer personal commitments or assign participants to member profiles from automated notes alone.
9. Only after verification, let the owner choose an import schedule. Triggers execute as the account that creates them.

Raw recordings and full transcripts remain in Drive/Docs. Store concise metadata and source links in the Sheet. A missing summary or inaccessible source must remain visibly missing.

## Member sign-in later

Member sign-in is separate from permission to import source files. Do not broaden the current preview to all signed-in Google users. Confirm the preferred member roster, implement server-side identity and membership checks on every operation, and test access with a second account first. Direct Sheet editor access can bypass application-level edit rules.

## Official references

- Apps Script web app identity and permissions: https://developers.google.com/apps-script/guides/web
- Apps Script authorization: https://developers.google.com/apps-script/guides/services/authorization
- Drive shortcuts and original targets: https://developers.google.com/workspace/drive/api/guides/shortcuts
- Docs API scopes: https://developers.google.com/workspace/docs/api/auth

Status: ongoing importer, additional scope grants, recurring triggers, and member access are not configured by this document.
