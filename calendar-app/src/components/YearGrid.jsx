import { MONTH_NAMES } from '../constants';
import MonthCell from './MonthCell';
import './YearGrid.css';

function YearGrid({ year, events, monthNotes, onMonthClick, onEventClick, hoveredEvent, onEventHover, searchQuery, activeCategoryList }) {
  const quarters = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];

  return (
    <div className="year-grid">
      {quarters.map((qMonths, qi) => (
        <div key={qi} className="quarter-row">
          <div className="quarter-months">
            {qMonths.map((month) => (
              <MonthCell
                key={month}
                year={year}
                month={month}
                events={events}
                monthNotes={monthNotes}
                onMonthClick={onMonthClick}
                onEventClick={onEventClick}
                hoveredEvent={hoveredEvent}
                onEventHover={onEventHover}
                searchQuery={searchQuery}
                size="sm"
              />
            ))}
          </div>
          {activeCategoryList && (
            <div className="quarter-print-legend">
              {activeCategoryList.map(([name, cat]) => (
                <span key={name} className="quarter-legend-item">
                  <span
                    className="quarter-legend-swatch"
                    style={{ background: cat.color }}
                  />
                  {name}
                </span>
              ))}
            </div>
          )}
          {qi < 3 && <div className="quarter-divider" />}
        </div>
      ))}
    </div>
  );
}

export default YearGrid;
