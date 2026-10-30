/** Owner-only, read-only proof of concept. Real configuration is not stored here. */
function requireOwner_() {
  const config = typeof JUNTO_CONFIG === 'object' ? JUNTO_CONFIG : {};
  const expected = String(config.ownerEmail || '').trim().toLowerCase();
  const actual = String(Session.getActiveUser().getEmail() || '').trim().toLowerCase();
  if (!expected || !actual || actual !== expected) throw new Error('This preview is available only to its owner.');
  if (!config.spreadsheetId) throw new Error('The preview has not been configured.');
  return config;
}

function doGet() {
  requireOwner_();
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Junto · Owner preview')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function includeStyle_() { return HtmlService.createHtmlOutputFromFile('Style').getContent(); }

function readRecords_(spreadsheet, name) {
  const sheet = spreadsheet.getSheetByName(name);
  if (!sheet) throw new Error('A required records tab is missing.');
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows.shift() || [];
  return rows.filter(row => row[0]).map(row => headers.reduce((record, header, i) => {
    if (header) record[header] = row[i] || '';
    return record;
  }, {}));
}

function getSnapshot() {
  const config = requireOwner_(); // Authenticate before accessing any Sheet data.
  const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
  const collections = {};
  ['Members', 'Meetings', 'Reflections', 'Commitments', 'ProgressLog', 'Resources', 'Leadership'].forEach(name => {
    collections[name] = readRecords_(spreadsheet, name);
  });
  return { collections: collections, loadedAt: new Date().toISOString(), sheetUrl: spreadsheet.getUrl() };
}
