import { MONTH_LEVEL_THRESHOLD } from './constants';

export function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysBetween(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export function isMonthLevel(event) {
  return daysBetween(event.startDate, event.endDate) >= MONTH_LEVEL_THRESHOLD;
}

export function getMonthDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

export function formatDateRange(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  const opts = { month: 'short', day: 'numeric' };
  if (startStr === endStr) {
    return start.toLocaleDateString('en-US', opts);
  }
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

export function getEventSpanForMonth(event, year, month) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const evStart = parseDate(event.startDate);
  const evEnd = parseDate(event.endDate);

  const clampedStart = evStart < monthStart ? monthStart : evStart;
  const clampedEnd = evEnd > monthEnd ? monthEnd : evEnd;

  if (clampedStart > monthEnd || clampedEnd < monthStart) return null;

  return {
    startDay: clampedStart.getDate(),
    endDay: clampedEnd.getDate(),
    startsBeforeMonth: evStart < monthStart,
    endsAfterMonth: evEnd > monthEnd,
  };
}

export function eventOverlapsMonth(event, year, month) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const evStart = parseDate(event.startDate);
  const evEnd = parseDate(event.endDate);
  return evStart <= monthEnd && evEnd >= monthStart;
}

export function getWeeksForMonth(year, month) {
  const totalDays = getMonthDays(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const weeks = [];
  let currentWeek = new Array(firstDay).fill(null);

  for (let d = 1; d <= totalDays; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}
