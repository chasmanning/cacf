import { SHEET_CONFIG } from './config';

/**
 * Parse a single CSV line, handling quoted fields.
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/**
 * Parse CSV text into an array of objects keyed by header names.
 */
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, j) => {
      row[h] = (values[j] || '').trim();
    });
    rows.push(row);
  }
  return rows;
}

/**
 * Normalize a date string to YYYY-MM-DD.
 * Accepts: MM/DD/YYYY, M/D/YYYY, M/D/YY, YYYY-MM-DD
 */
function normalizeDate(str) {
  if (!str) return '';
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  const parts = str.split('/');
  if (parts.length === 3) {
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    const year = parts[2].length === 2 ? '20' + parts[2] : parts[2];
    return `${year}-${month}-${day}`;
  }
  return str;
}

/**
 * Fetch events from the published Google Sheet.
 */
async function fetchFromSheet() {
  const { sheetId, sheetName } = SHEET_CONFIG;
  const tab = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '';
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${tab}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

  const text = await res.text();
  const rows = parseCSV(text);

  return rows
    .map((r) => ({
      name: r['event name'] || r['name'] || r['event'] || '',
      category: r['category'] || r['type'] || '',
      startDate: normalizeDate(r['start date'] || r['start'] || r['date'] || ''),
      endDate: normalizeDate(r['end date'] || r['end'] || r['date'] || ''),
      status: r['status'] || 'Confirmed',
    }))
    .filter((ev) => ev.name && ev.startDate);
}

/**
 * Load events: try Google Sheets first, fall back to local events.json.
 */
export async function loadEvents() {
  if (SHEET_CONFIG.enabled && SHEET_CONFIG.sheetId) {
    try {
      const events = await fetchFromSheet();
      if (events.length > 0) return events;
    } catch (err) {
      console.warn('Google Sheets fetch failed, falling back to events.json:', err);
    }
  }

  const res = await fetch('/events.json');
  return res.json();
}
