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

  return (
    <div className="month-detail">
      <div className="month-detail-top">
        <button className="back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Year
        </button>
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
            <div key={wi} className="detail-week-row">
              <div className="detail-day-numbers">
                {week.map((day, di) => {
                  const isWeekend = di === 0 || di === 6;
                  return (
                    <div
                      key={di}
                      className={`detail-day-cell ${day === null ? 'empty' : ''} ${isWeekend ? 'weekend' : ''}`}
                    >
                      {day !== null && <span className="detail-day-num">{day}</span>}
                    </div>
                  );
                })}
              </div>
              <div className="detail-event-lanes">
                {weekEventLanes[wi]?.map((lane, li) => (
                  <div key={li} className="detail-event-lane">
                    {lane.map((item, ii) => {
                      const cat = CATEGORIES[item.event.category] || {};
                      const colSpan = item.endCol - item.startCol + 1;
                      const isHovered = hoveredEvent &&
                        hoveredEvent.name === item.event.name &&
                        hoveredEvent.startDate === item.event.startDate;
                      return (
                        <div
                          key={ii}
                          className={`detail-event-bar ${isHovered ? 'highlighted' : ''} ${item.continuesLeft ? 'continues-left' : ''} ${item.continuesRight ? 'continues-right' : ''}`}
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
                          {item.event.name}
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
        <div className="detail-notes">
          <span className="detail-notes-label">Notes: </span>
          {notes.map((n, i) => (
            <span key={i} className="detail-note" style={{ color: CATEGORIES[n.category]?.color }}>
              {n.name} ({formatDateRange(n.startDate, n.endDate)})
              {n.status === 'Tentative' ? ' — Tentative' : ''}
              {i < notes.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
      )}
      {tooltip && <Tooltip event={tooltip.event} x={tooltip.x} y={tooltip.y} />}
    </div>
  );
}

export default MonthDetail;
