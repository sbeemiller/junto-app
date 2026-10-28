# Junto: shared records and member access

Status: proposed implementation plan, based on the agreed group workflow. No live Google connection, member authentication, or WhatsApp automation is configured.

## Operating model

- The existing invite owner continues maintaining the Google Meet invitation. No new shared calendar is required.
- The group collectively selects the next leader. That leader prepares the gathering and posts the attendance poll in the existing WhatsApp group.
- Reflections are available to all approved members. The application is a convenient view of a restricted, group-owned record.
- Keep the existing public demo fictional. Real group data must never be committed to GitHub or bundled into the published demo.

## Where information lives

| Location | Contents | Access |
| --- | --- | --- |
| Restricted Google Drive folder | Recordings, transcripts, original notes, resource files | Approved members; invite owner and a backup maintain access |
| Restricted Google Sheet | Structured records listed below | Members can read; designated maintainers can edit directly |
| Authenticated Junto app | Mobile views and validated updates to the Sheet | Approved Google accounts only |
| Existing WhatsApp group | Attendance polls, reminders, discussion, shared links | Existing group membership |

A shared Drive folder and a Google Workspace Shared drive are different products. Verify which is available and who owns the files before selecting the filing workflow. Do not change source-file ownership or permissions merely to make an import succeed.

## Proposed Sheet tabs

Every record has a stable ID. Dates and timestamps are stored consistently; display meeting times in the meeting's stated timezone.

| Tab | Main fields | History behavior |
| --- | --- | --- |
| Members | member_id, display_name, Google account identity, active status, role, profile, current focus | Deactivate departing members; preserve references in historical records |
| Reflections | reflection_id, member_id, reflection_date, high, low, buffalo, created_at, updated_at | Preserve every posting; profile displays latest by reflection date, then update time |
| Commitments | commitment_id, member_id, title, theme, target, unit, timeframe, partner_id, status | Closing or renewing a commitment does not erase its earlier period |
| ProgressLog | event_id, commitment_id, member_id, change, occurred_at, recorded_at, correction_of | Append progress and correction events; derive totals without double counting |
| Meetings | meeting_id, date/time/timezone, leader_id, status, topic, opening question, agenda, summary, takeaways, carry-forward question, artifact links | Retain past meetings; select next gathering from future scheduled meetings |
| Resources | resource_id, meeting_id if relevant, title, type, URL/file ID, suggested_by, theme, context | Group library and meeting-linked recommendations share the same records |
| Leadership | assignment_id, meeting_id, leader_id, assigned_at, assigned_by, backup_id | Record handoffs rather than overwriting who led past meetings |
| ChangeLog | change_id, actor_id, entity_type, entity_id, action, timestamp | Record consequential edits; avoid duplicating full private reflection text in logs |

CSV/Excel downloads should remain possible through Sheets. Include a documented group backup/export procedure. Year-end recognition can use commitment history and member context; no automatic ranking or award decisions.

## Permissions to prove before implementation

| Action | Member | Assigned leader | Maintainer / backup |
| --- | --- | --- | --- |
| Read group profiles, reflections, commitments, and meeting records | Yes | Yes | Yes |
| Update own profile, focus, reflections, and commitments | Yes | Yes | Yes |
| Update another member's personal entries | No | No | Explicit correction process only |
| Prepare assigned gathering and publish its reviewed recap | No | Yes | Yes |
| Add a resource with attribution | Yes | Yes | Yes |
| Change membership or direct Sheet/Drive permissions | No | No | Yes |

Proposed architecture candidate: authenticated app → server-side authorization → restricted Sheet. This is not yet a chosen deployment design. A public URL, hidden spreadsheet ID, or browser-supplied email is not authorization. Verify Google identity and active membership on the server for every read/write. Check record ownership and meeting leadership there too. Keep Google credentials out of browser code and GitHub. Direct Sheet editors can bypass application rules; reserve that access for maintainers.

Apps Script is a candidate based on the group's preference for Google Sheets. First prove authentication with separate member accounts and the selected execution identity. Verify read access, authorized writes, rejected writes, concurrent updates, retry safety, and mobile sign-in before connecting real records. Only then choose hosting and deployment settings. No owner-privileged anonymous write endpoint.

## Gathering workflow

1. Invite owner keeps the existing invitation current; leader confirms date/time and Meet link in Junto. Begin with manual entry, avoiding a second calendar to maintain.
2. Group selects a leader; maintainer records the assignment and a backup.
3. Leader fills in the topic, opening question, agenda, preparation, and resource links. Preview before publishing to Next Gathering.
4. Junto prepares WhatsApp invitation text. Leader chooses the group, sends it, and creates the attendance poll in WhatsApp. Poll results stay there initially.
5. Verify where the organizer's Meet artifacts land. Establish a manual shared-folder process first; investigate a narrowly scoped scheduled importer after permissions and file layout are confirmed.
6. Import available original artifacts and their links once ready. Deduplicate by source file/conference ID and retry safely. Missing recordings or transcripts must not create invented content.
7. Leader reviews summary, themes, takeaways, and carry-forward question before publishing the recap. Automated summary generation requires its own provider, privacy, and cost decision; original notes can be used first.
8. Junto prepares a short WhatsApp recap and a missed-call reflection link for a person to review and send. Saving a reflection updates the member's latest profile entry.

## WhatsApp first version

- Share gathering: date, time, leader, preparation, and link to Junto; leader adds the attendance poll separately.
- Share recap: short reviewed summary plus member-only meeting/resource links.
- Invite a missed-call check-in: link to the authenticated reflection form.
- Suggest a resource: member opens Junto from WhatsApp and submits the recommendation with attribution.

These are user-reviewed sharing actions, not background posting. Automatic group reading, poll synchronization, and unattended messages remain unverified and out of initial scope. Do not scrape the group or copy its history into the app.

## Next verification checklist

- [ ] Confirm organizer Google account type and which artifacts are actually generated.
- [ ] Inspect one representative recording, transcript, and notes set with permission.
- [ ] Identify the restricted group folder, its owner, members, and backup maintainer.
- [ ] Decide who will own the Sheet and application deployment.
- [ ] Confirm whether all members can use individual Google accounts for sign-in.
- [ ] Validate the authentication/Sheet proof of concept using fictional data and two test accounts.
- [ ] Review the proposed permission matrix with the group before inviting real members.

No messages have been sent to the organizer or group. No Google files or sharing settings have been changed by this plan.
