/**
 * Google Sheets Integration
 *
 * To connect your calendar to a Google Sheet:
 *
 * 1. Create a Google Sheet with these columns (row 1 = headers):
 *    Event Name | Category | Start Date | End Date
 *
 *    - Category must match exactly: Office Closed, Events, Board/Committee,
 *      Communications, Grants & Programs, Scholarships, Bama,
 *      Deep Work Weeks, School Closed/Office Open, Strategic Growth
 *    - Dates can be MM/DD/YYYY or YYYY-MM-DD
 *
 * 2. Publish the sheet:
 *    File > Share > Publish to web > Entire Document > CSV > Publish
 *
 * 3. Copy the Sheet ID from the sheet URL:
 *    https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
 *
 * 4. Paste it below and set enabled: true
 */
export const SHEET_CONFIG = {
  enabled: true,
  sheetId: '1ieLxJ236GqVGJuLw7-XlNhk3UPNtUipsnDJfO2768gU',
  // Optional: specific tab name (leave empty for first tab)
  sheetName: '',
  // Auto-refresh interval in minutes (0 = load once on page open)
  refreshMinutes: 5,
};
