import { useMemo, useState } from 'react';
import { MONTH_NAMES, DAY_NAMES, CATEGORIES } from '../constants';
import { getWeeksForMonth, eventOverlapsMonth, getEventSpanForMonth, daysBetween } from '../utils';
import Tooltip from './Tooltip';
import './MonthCell.css';

function MonthCell({
  year, month, events, monthNotes, onMonthClick,
  onEventClick, hoveredEvent, onEventHover, searchQuery, compact
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

  // Allocate event lanes per week row so multi-day bars don't overlap
  const weekEventLanes = useMemo(() => {
    return weeks.map((week) => {
      const lanes = [];
      const weekStart = week.find((d) => d !== null) || 1;
      const weekEnd = week[6] !== null ? week[6] : week.filter((d) => d !== null).pop() || weekStart;

      for (const ev of monthEvents) {
        if (!ev.span) continue;
        const evS = ev.span.startDay;
        const evE = ev.span.endDay;
        if (evE < weekStart || evS > weekEnd) continue;

        const barStart = Math.max(evS, weekStart);
        const barEnd = Math.min(evE, weekEnd);
        const startCol = week.indexOf(barStart);
        const endCol = week.indexOf(barEnd);
        if (startCol === -1 || endCol === -1) continue;

        let laneIdx = 0;
        while (true) {
          if (!lanes[laneIdx]) lanes[laneIdx] = [];
          const conflict = lanes[laneIdx].some(
            (existing) =>
              !(endCol < existing.startCol || startCol > existing.endCol)
          );
          if (!conflict) {
            lanes[laneIdx].push({
              event: ev,
              startCol,
              endCol,
              barStart,
              barEnd,
              continuesLeft: evS < weekStart,
              continuesRight: evE > weekEnd,
            });
            break;
          }
          laneIdx++;
        }
      }
      return lanes;
    });
  }, [weeks, monthEvents]);

  const handleEventMouseEnter = (ev, e) => {
    onEventHover(ev);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ event: ev, x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleEventMouseLeave = () => {
    onEventHover(null);
    setTooltip(null);
  };

  const isEventHighlighted = (ev) => {
    if (hoveredEvent && hoveredEvent.name === ev.name && hoveredEvent.startDate === ev.startDate) {
      return 'highlighted';
    }
    return '';
  };

  return (
    <div className={`month-cell ${compact ? 'compact' : ''}`}>
      <div className="month-header" onClick={() => onMonthClick(month)}>
        {MONTH_NAMES[month]}
      </div>
      <div className="month-body">
        <div className="day-names">
          {DAY_NAMES.map((d) => (
            <div key={d} className="day-name">{d[0]}</div>
          ))}
        </div>
        <div className="weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="week-row">
              <div className="day-numbers">
                {week.map((day, di) => {
                  const isWeekend = di === 0 || di === 6;
                  return (
                    <div
                      key={di}
                      className={`day-cell ${day === null ? 'empty' : ''} ${isWeekend ? 'weekend' : ''}`}
                    >
                      {day !== null && <span className="day-num">{day}</span>}
                    </div>
                  );
                })}
              </div>
              <div className="event-lanes">
                {weekEventLanes[wi]?.map((lane, li) => (
                  <div key={li} className="event-lane">
                    {lane.map((item, ii) => {
                      const cat = CATEGORIES[item.event.category] || {};
                      const colSpan = item.endCol - item.startCol + 1;
                      const isHovered = isEventHighlighted(item.event);
                      const dimmed = searchQuery && !item.event.name.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <div
                          key={ii}
                          className={`event-bar ${isHovered} ${dimmed ? 'dimmed' : ''} ${item.continuesLeft ? 'continues-left' : ''} ${item.continuesRight ? 'continues-right' : ''}`}
                          style={{
                            gridColumn: `${item.startCol + 1} / span ${colSpan}`,
                            backgroundColor: cat.color,
                            color: cat.textColor,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(item.event);
                          }}
                          onMouseEnter={(e) => handleEventMouseEnter(item.event, e)}
                          onMouseLeave={handleEventMouseLeave}
                        >
                          <span className="event-bar-label">{item.event.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {notes.length > 0 && (
        <div className="month-notes">
          {notes.map((n, i) => (
            <span key={i} className="month-note" style={{ color: CATEGORIES[n.category]?.color }}>
              {n.name}{n.status === 'Tentative' ? ' (T)' : ''}
              {i < notes.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
      )}
      {tooltip && (
        <Tooltip
          event={tooltip.event}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
}

export default MonthCell;
