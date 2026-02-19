import { MONTH_NAMES } from '../constants';
import MonthCell from './MonthCell';
import './MultiMonthView.css';

function MultiMonthView({
  year, count, startMonth, onStartMonthChange,
  events, monthNotes, onMonthClick, onEventClick,
  hoveredEvent, onEventHover, searchQuery
}) {
  const months = [];
  for (let i = 0; i < count; i++) {
    months.push((startMonth + i) % 12);
  }

  const canGoBack = startMonth > 0;
  const canGoForward = startMonth + count <= 11;

  const handlePrev = () => {
    if (canGoBack) onStartMonthChange(Math.max(0, startMonth - count));
  };

  const handleNext = () => {
    if (canGoForward) onStartMonthChange(Math.min(12 - count, startMonth + count));
  };

  const rangeLabel = count === 1
    ? MONTH_NAMES[months[0]]
    : `${MONTH_NAMES[months[0]]} – ${MONTH_NAMES[months[months.length - 1]]}`;

  return (
    <div className="multi-month-view">
      <div className="multi-month-nav">
        <button
          className="nav-btn"
          onClick={handlePrev}
          disabled={!canGoBack}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="nav-label">{rangeLabel} {year}</span>
        <button
          className="nav-btn"
          onClick={handleNext}
          disabled={!canGoForward}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={`multi-month-grid cols-${count}`}>
        {months.map((m) => (
          <MonthCell
            key={m}
            year={year}
            month={m}
            events={events}
            monthNotes={monthNotes}
            onMonthClick={onMonthClick}
            onEventClick={onEventClick}
            hoveredEvent={hoveredEvent}
            onEventHover={onEventHover}
            searchQuery={searchQuery}
            compact={false}
          />
        ))}
      </div>
    </div>
  );
}

export default MultiMonthView;
