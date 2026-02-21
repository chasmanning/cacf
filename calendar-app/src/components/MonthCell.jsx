import { useMemo, useState } from 'react';
import { MONTH_NAMES, DAY_NAMES, CATEGORIES } from '../constants';
import { getWeeksForMonth, eventOverlapsMonth, getEventSpanForMonth, daysBetween } from '../utils';
import Tooltip from './Tooltip';
import './MonthCell.css';

function MonthCell({
  year, month, events, monthNotes, onMonthClick,
  onEventClick, hoveredEvent, onEventHover, searchQuery, size = 'sm'
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

  const showLabels = size === 'md' || size === 'lg';
  const showFullDayNames = size !== 'sm';

  return (
    <div className={`month-cell size-${size}`}>
      <div className="month-header" onClick={() => onMonthClick(month)}>
        {MONTH_NAMES[month]}
      </div>
      <div className="month-body">
        <div className="day-names">
          {DAY_NAMES.map((d) => (
            <div key={d} className="day-name">
              {showFullDayNames ? d : d[0]}
            </div>
          ))}
        </div>
        <div className="weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="day-row">
              {week.map((day, di) => {
                const isWeekend = di === 0 || di === 6;
                const evts = day ? dayEventsMap[day] || [] : [];
                const primary = evts[0];
                const cat = primary ? CATEGORIES[primary.category] || {} : null;
                const hasEvents = evts.length > 0;
                const isHovered = hasEvents && hoveredEvent &&
                  evts.some((ev) => ev.name === hoveredEvent.name && ev.startDate === hoveredEvent.startDate);
                const dimmed = hasEvents && searchQuery &&
                  !evts.some((ev) => ev.name.toLowerCase().includes(searchQuery.toLowerCase()));

                const isMulti = evts.length > 1;

                let bgStyle = {};
                if (evts.length === 1) {
                  bgStyle = { backgroundColor: cat.color };
                } else if (isMulti) {
                  const stops = evts.map((ev, i) => {
                    const c = CATEGORIES[ev.category]?.color || '#999';
                    const pct1 = (i / evts.length) * 100;
                    const pct2 = ((i + 1) / evts.length) * 100;
                    return `${c} ${pct1}%, ${c} ${pct2}%`;
                  }).join(', ');
                  bgStyle = { background: `linear-gradient(to bottom right, ${stops})` };
                }

                return (
                  <div
                    key={di}
                    className={`day-cell ${day === null ? 'empty' : ''} ${day !== null && isWeekend && !hasEvents ? 'weekend' : ''} ${hasEvents ? 'has-event' : ''} ${isHovered ? 'hovered' : ''} ${dimmed ? 'dimmed' : ''}`}
                    style={hasEvents ? bgStyle : undefined}
                    onMouseEnter={day ? (e) => handleDayMouseEnter(day, e) : undefined}
                    onMouseLeave={day ? handleDayMouseLeave : undefined}
                    onClick={day ? (e) => handleDayClick(day, e) : undefined}
                  >
                    {day !== null && (
                      <span
                        className="day-num"
                        style={hasEvents ? { color: cat?.textColor || '#fff' } : undefined}
                      >
                        {day}
                      </span>
                    )}
                    {showLabels && hasEvents && (
                      <div className="cell-event-names">
                        {evts.map((ev, i) => {
                          const evCat = CATEGORIES[ev.category] || {};
                          return (
                            <span
                              key={i}
                              className="cell-event-name"
                              style={{ color: isMulti ? (evCat.textColor || '#fff') : (cat?.textColor || '#fff') }}
                            >
                              {ev.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    {!showLabels && isMulti && (
                      <span className="multi-dot">{evts.length}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {notes.length > 0 && (
        <div className="month-notes">
          {notes.map((n, i) => (
            <span key={i} className="month-note" style={{ color: CATEGORIES[n.category]?.color }}>
              {n.name}
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

export default MonthCell;
