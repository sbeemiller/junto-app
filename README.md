# Junto

A mobile-first, fictional brotherhood prototype built with plain HTML, CSS, and JavaScript. No installation, build step, dependencies, accounts, or API keys needed.

## Preview in VS Code

1. Open this `junto-app` folder in VS Code (File → Open Folder).
2. Choose Terminal → New Terminal.
3. Type the following and press Enter:

   ```sh
   python3 serve.py
   ```

4. Open **http://localhost:8000** in your browser.
5. Leave the terminal running while you use the app. After editing a file, save it and refresh the browser to see the change.
6. To stop the server, click in that terminal and press **Control+C**.

If port 8000 is already in use, an existing preview may be running. Try the address above, or stop that server with Control+C before starting another.

To try the mobile layout in Chrome, open View → Developer → Developer Tools, then click the phone/tablet icon. Try a width of 390 pixels. The local server is accessible on this computer only.

## Try it

- **Home:** add a dated high/low/buffalo reflection (fill any one field or all three), revisit and edit previous entries, edit your personal focus and adjust counted commitments with − / +, or check off binary commitments. Open the upcoming gathering to see its agenda.
- **Brothers:** open any of the six fictional illustrated profiles to read their current chapter, growth theme, and ways to support them.
- **Meetings:** search by title, topic, summary, or takeaway; filter by topic; open a conversation for its summary, themes, takeaways, and reflection question. Add/edit Google folder, recording, and notes/transcript links. Add/edit tools, videos, readings, or other resource links, including who suggested them and why they helped.
- **Commitments:** add or edit a promise, choose a partner, set a target, record progress, filter by status, or remove a commitment. Removal asks for confirmation. Counted goals use bounded − / + controls; one-time tasks use a checkbox. Completed counted goals stay at their target until you deliberately decrease or edit them.
- Refresh the page: your focus, commitments, reflections, and meeting links should still be there.

## Files

- `index.html`: the page shell, navigation, and dialog.
- `styles.css`: colors, typography, mobile and desktop layouts.
- `app.js`: fictional data, screens, interaction, and local browser storage.
- `features.js`: reflections and meeting/resource link forms.
- `assets/mountains.svg`: original local landscape illustration.
- `serve.py`: Python's built-in local development server.
- `design-reference.png`: your supplied visual reference, kept unchanged.

## How saving works

Your personal focus, commitments, dated reflections, and meeting/resource links save in `localStorage` under `junto18.v1`. Storage belongs to this browser and address; use the same URL each time. Another browser, private browsing, or clearing website data may give you a fresh copy. There is no sync or backup. If browser storage is blocked, the app shows a warning and changes last only for the current visit.

To deliberately reset sample data: open your browser's developer console on the app, run `localStorage.removeItem('junto18.v1')`, then refresh. This removes your prototype edits.

All people, portraits, meetings, and commitments are fictional. The upcoming gathering is a fixed sample dated October 29, 2026; there is no real meeting link. Profiles and meeting summaries are read-only sample content. Meeting links and resources are editable. Google files are opened via links; this app does not connect to Google or change file permissions. Uploads and shared reflections are not implemented. No external fonts, images, AI services, authentication, analytics, or database are used.

## Local Git version history

Git tracks changes to the application files. It does not back up browser-local entries or link this project to GitHub automatically.

Useful commands in the VS Code terminal:

```sh
git status
git log --oneline
```

After reviewing a change, save a new checkpoint:

```sh
git add index.html styles.css app.js features.js README.md
git commit -m "Describe what changed"
```

The initial checkpoint includes the supplied design reference. `.gitignore` excludes common local clutter and environment files. No GitHub remote or publishing is configured. Choose an account and repository name when ready to publish.
