import { useMemo, useState } from 'react';
import { MONTH_NAMES, DAY_NAMES, CATEGORIES } from '../constants';
import { getWeeksForMonth, eventOverlapsMonth, getEventSpanForMonth, daysBetween, formatDateRange } from '../utils';
import Tooltip from './Tooltip';
import './MonthDetail.css';

function MonthDetail({
  year, month, events, monthNotes, onBack,
  onEventClick, hoveredEvent, onEventHover
}) {
  const [tooltip, setTooltip] = useState(null);
  const weeks = useMemo(() => getWeeksForMonth(year, month), [year, month]);

  const monthEvents = useMemo(() => {
    return events
      .filter((ev) => eventOverlapsMonth(ev, year, month))
      .map((ev) => ({
        ...ev,
        span: getEventSpanForMonth(ev, year, month),
        totalDays: daysBetween(ev.startDate, ev.endDate) + 1,
      }))
      .sort((a, b) => b.totalDays - a.totalDays || a.span.startDay - b.span.startDay);
  }, [events, year, month]);

  const notes = useMemo(() => {
    return monthNotes.filter((ev) => eventOverlapsMonth(ev, year, month));
  }, [monthNotes, year, month]);

  // Build a map of day -> events for coloring cells
  const dayEventsMap = useMemo(() => {
    const map = {};
    for (const ev of monthEvents) {
      if (!ev.span) continue;
      for (let d = ev.span.startDay; d <= ev.span.endDay; d++) {
        if (!map[d]) map[d] = [];
        map[d].push(ev);
      }
    }
    return map;
  }, [monthEvents]);

  const handleDayMouseEnter = (day, e) => {
    const evts = dayEventsMap[day];
    if (!evts || evts.length === 0) return;
    onEventHover(evts[0]);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ events: evts, x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleDayMouseLeave = () => {
    onEventHover(null);
    setTooltip(null);
  };

  const handleDayClick = (day, e) => {
    const evts = dayEventsMap[day];
    if (!evts || evts.length === 0) return;
    e.stopPropagation();
    onEventClick(evts[0]);
  };

  return (
    <div className="month-detail">
      <div className="month-detail-top">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Year
          </button>
        )}
        <h2 className="month-detail-title">{MONTH_NAMES[month]} {year}</h2>
      </div>
      <div className="month-detail-grid">
        <div className="detail-day-names">
          {DAY_NAMES.map((d) => (
            <div key={d} className="detail-day-name">{d}</div>
          ))}
        </div>
        <div className="detail-weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="detail-day-row">
              {week.map((day, di) => {
                const isWeekend = di === 0 || di === 6;
                const evts = day ? dayEventsMap[day] || [] : [];
                const primary = evts[0];
                const cat = primary ? CATEGORIES[primary.category] || {} : null;
                const hasEvents = evts.length > 0;
                const isHovered = hasEvents && hoveredEvent &&
                  evts.some((ev) => ev.name === hoveredEvent.name && ev.startDate === hoveredEvent.startDate);

                const isMulti = evts.length > 1;

                return (
                  <div
                    key={di}
                    className={`detail-day-cell ${day === null ? 'empty' : ''} ${day !== null && isWeekend && !hasEvents ? 'weekend' : ''} ${hasEvents ? 'has-event' : ''} ${isMulti ? 'multi-event' : ''} ${isHovered ? 'hovered' : ''}`}
                    style={hasEvents && !isMulti ? { backgroundColor: cat.color } : undefined}
                    onMouseEnter={day ? (e) => handleDayMouseEnter(day, e) : undefined}
                    onMouseLeave={day ? handleDayMouseLeave : undefined}
                    onClick={day ? (e) => handleDayClick(day, e) : undefined}
                  >
                    {day !== null && !isMulti && (
                      <span
                        className="detail-day-num"
                        style={hasEvents ? { color: cat?.textColor || '#fff' } : undefined}
                      >
                        {day}
                      </span>
                    )}
                    {hasEvents && !isMulti && (
                      <div className="detail-event-names">
                        <span className="detail-event-name" style={{ color: cat?.textColor || '#fff' }}>
                          {evts[0].name}
                        </span>
                      </div>
                    )}
                    {isMulti && (
                      <div className="detail-event-bands">
                        {evts.map((ev, i) => (
                          <div key={i} className="detail-band" style={{ backgroundColor: CATEGORIES[ev.category]?.color }}>
                            {i === 0 && day !== null && (
                              <span
                                className="detail-day-num"
                                style={{ color: CATEGORIES[ev.category]?.textColor || '#fff' }}
                              >
                                {day}
                              </span>
                            )}
                            <span className="detail-event-name" style={{ color: CATEGORIES[ev.category]?.textColor || '#fff' }}>
                              {ev.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {notes.length > 0 && (
        <div className="detail-notes">
          <span className="detail-notes-label">Notes: </span>
          {notes.map((n, i) => (
            <span key={i} className="detail-note" style={{ color: CATEGORIES[n.category]?.color }}>
              {n.name}<span className="detail-note-date"> ({formatDateRange(n.startDate, n.endDate)})</span>
              {i < notes.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
      )}
      {tooltip && (
        <Tooltip
          event={tooltip.events[0]}
          allEvents={tooltip.events}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
}

export default MonthDetail;
