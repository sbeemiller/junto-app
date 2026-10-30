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

function recordsFromValues_(values) {
  const rows = (values || []).map(row => row.slice());
  const headers = rows.shift() || [];
  return rows.filter(row => row[0]).map(row => headers.reduce((record, header, i) => {
    if (header) record[header] = row[i] == null ? '' : String(row[i]);
    return record;
  }, {}));
}

function getSnapshot() {
  const config = requireOwner_(); // Authenticate before accessing any Sheet data.
  const names = ['Members', 'Meetings', 'Reflections', 'Commitments', 'ProgressLog', 'Resources', 'Leadership'];
  // The Sheets API supports the existing read-only scope. SpreadsheetApp.openById
  // requires the broader spreadsheets scope, even for a read-only operation.
  const result = Sheets.Spreadsheets.Values.batchGet(config.spreadsheetId, {
    ranges: names.map(name => "'" + name + "'!A1:W1000"),
    valueRenderOption: 'FORMATTED_VALUE'
  });
  const ranges = result.valueRanges || [];
  if (ranges.length !== names.length) throw new Error('Not all required records tabs could be read.');
  const collections = {};
  names.forEach((name, i) => { collections[name] = recordsFromValues_(ranges[i].values); });
  return { collections: collections, loadedAt: new Date().toISOString(),
    sheetUrl: 'https://docs.google.com/spreadsheets/d/' + config.spreadsheetId + '/edit' };
}
