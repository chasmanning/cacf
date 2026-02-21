import { useState, useEffect, useMemo, useCallback } from 'react';
import { CATEGORIES, MONTH_NAMES } from './constants';
import { isMonthLevel, formatDateRange, parseDate, eventOverlapsMonth } from './utils';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import YearGrid from './components/YearGrid';
import MultiMonthView from './components/MultiMonthView';
import MonthDetail from './components/MonthDetail';
import ListView from './components/ListView';
import EventModal from './components/EventModal';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [activeCategories, setActiveCategories] = useState(
    () => new Set(Object.keys(CATEGORIES))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('year');
  const [startMonth, setStartMonth] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [printAllMonths, setPrintAllMonths] = useState(false);

  useEffect(() => {
    fetch('/events.json')
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (!activeCategories.has(ev.category)) return false;
      if (searchQuery) {
        return ev.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [events, activeCategories, searchQuery]);

  const calendarEvents = useMemo(
    () => filteredEvents.filter((ev) => !isMonthLevel(ev)),
    [filteredEvents]
  );

  const monthNotes = useMemo(
    () => filteredEvents.filter((ev) => isMonthLevel(ev)),
    [filteredEvents]
  );

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectAll = () => setActiveCategories(new Set(Object.keys(CATEGORIES)));
  const selectNone = () => setActiveCategories(new Set());

  const handleMonthClick = (month) => {
    setStartMonth(month);
    setView('1mo');
  };

  const handleBackToYear = () => {
    setView('year');
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === '1mo' || newView === '2mo' || newView === '3mo') {
      setStartMonth(0);
    }
  };

  const activeCategoryList = useMemo(() => {
    return Object.entries(CATEGORIES).filter(([name]) => activeCategories.has(name));
  }, [activeCategories]);

  const visibleMonths = useMemo(() => {
    if (view === '1mo') return [startMonth];
    if (view === '2mo') return [startMonth, startMonth + 1].filter((m) => m < 12);
    if (view === '3mo') return [startMonth, startMonth + 1, startMonth + 2].filter((m) => m < 12);
    return Array.from({ length: 12 }, (_, i) => i); // year, list
  }, [view, startMonth]);

  const printAgenda = useMemo(() => {
    return visibleMonths
      .map((month) => {
        const monthEvents = filteredEvents
          .filter((ev) => eventOverlapsMonth(ev, 2026, month))
          .sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
        return { month, events: monthEvents };
      })
      .filter((g) => g.events.length > 0);
  }, [filteredEvents, visibleMonths]);

  const handlePrintAll = useCallback(() => {
    setPrintAllMonths(true);
  }, []);

  useEffect(() => {
    if (!printAllMonths) return;
    const prev = document.title;
    document.title = 'CACF Calendar - All Months 2026';
    // Give the browser time to render the print-all section
    const timer = setTimeout(() => {
      window.print();
      document.title = prev;
      setPrintAllMonths(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [printAllMonths]);

  const allMonthsAgenda = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i)
      .map((month) => {
        const monthEvents = filteredEvents
          .filter((ev) => eventOverlapsMonth(ev, 2026, month))
          .sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
        return { month, events: monthEvents };
      });
  }, [filteredEvents]);

  const isMultiMonth = view === '1mo' || view === '2mo' || view === '3mo';
  const monthCount = view === '1mo' ? 1 : view === '2mo' ? 2 : view === '3mo' ? 3 : 0;

  return (
    <div className={`app${printAllMonths ? ' printing-all' : ''}`}>
      <Header />
      <div className="controls">
        <FilterBar
          activeCategories={activeCategories}
          toggleCategory={toggleCategory}
          selectAll={selectAll}
          selectNone={selectNone}
        />
        <div className="controls-row">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                &times;
              </button>
            )}
          </div>
          <button className="print-btn" onClick={() => {
            const prev = document.title;
            if (view === '1mo') {
              document.title = `CACF Calendar - ${MONTH_NAMES[startMonth]} 2026`;
            } else if (view === '2mo') {
              const months = [startMonth, startMonth + 1].filter(m => m < 12);
              document.title = `CACF Calendar - ${MONTH_NAMES[months[0]]}-${MONTH_NAMES[months[months.length - 1]]} 2026`;
            } else if (view === '3mo') {
              const months = [startMonth, startMonth + 1, startMonth + 2].filter(m => m < 12);
              document.title = `CACF Calendar - ${MONTH_NAMES[months[0]]}-${MONTH_NAMES[months[months.length - 1]]} 2026`;
            } else {
              document.title = 'CACF Calendar - 2026';
            }
            window.print();
            document.title = prev;
          }}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print View
          </button>
          <button className="print-btn print-all-btn" onClick={handlePrintAll}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print All Months
          </button>
          <div className="view-toggles">
            <button
              className={view === '1mo' ? 'active' : ''}
              onClick={() => handleViewChange('1mo')}
            >
              1 Mo
            </button>
            <button
              className={view === '2mo' ? 'active' : ''}
              onClick={() => handleViewChange('2mo')}
            >
              2 Mo
            </button>
            <button
              className={view === '3mo' ? 'active' : ''}
              onClick={() => handleViewChange('3mo')}
            >
              3 Mo
            </button>
            <button
              className={view === 'year' ? 'active' : ''}
              onClick={() => handleViewChange('year')}
            >
              Year
            </button>
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => handleViewChange('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>
      <main className="main-content">
        {view === 'year' && (
          <YearGrid
            year={2026}
            events={calendarEvents}
            monthNotes={monthNotes}
            onMonthClick={handleMonthClick}
            onEventClick={setSelectedEvent}
            hoveredEvent={hoveredEvent}
            onEventHover={setHoveredEvent}
            searchQuery={searchQuery}
            activeCategoryList={activeCategoryList}
          />
        )}
        {isMultiMonth && (
          <MultiMonthView
            year={2026}
            count={monthCount}
            startMonth={startMonth}
            onStartMonthChange={setStartMonth}
            events={calendarEvents}
            monthNotes={monthNotes}
            onMonthClick={handleMonthClick}
            onEventClick={setSelectedEvent}
            hoveredEvent={hoveredEvent}
            onEventHover={setHoveredEvent}
            searchQuery={searchQuery}
            onBackToYear={handleBackToYear}
          />
        )}
        {view === 'list' && (
          <ListView
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        )}
      </main>
      {/* Print-only legend and agenda */}
      <div className="print-footer">
        <div className="print-legend">
          <div className="print-section-title">Legend</div>
          <div className="print-legend-items">
            {activeCategoryList.map(([name, cat]) => (
              <span key={name} className="print-legend-item">
                <span
                  className="print-legend-swatch"
                  style={{ background: cat.color }}
                />
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="print-agenda">
          <div className="print-section-title">Agenda</div>
          {printAgenda.map(({ month, events: monthEvents }) => (
            <div key={month} className="print-agenda-month">
              <div className="print-agenda-month-name">{MONTH_NAMES[month]}</div>
              {monthEvents.map((ev, i) => (
                <div key={i} className="print-agenda-item">
                  <span
                    className="print-cat-dot"
                    style={{ background: CATEGORIES[ev.category]?.color }}
                  />
                  <span className="print-agenda-date">
                    {formatDateRange(ev.startDate, ev.endDate)}
                  </span>
                  <span className="print-agenda-name">{ev.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Print All Months: one MonthDetail per page with its agenda */}
      {printAllMonths && (
        <div className="print-all-section">
          {Array.from({ length: 12 }, (_, i) => i).map((month) => (
            <div key={month} className="print-all-page">
              <MonthDetail
                year={2026}
                month={month}
                events={calendarEvents}
                monthNotes={monthNotes}
                onEventClick={() => {}}
                hoveredEvent={null}
                onEventHover={() => {}}
              />
              {allMonthsAgenda[month].events.length > 0 && (
                <div className="print-all-agenda">
                  <div className="print-section-title">Events — {MONTH_NAMES[month]}</div>
                  {allMonthsAgenda[month].events.map((ev, i) => (
                    <div key={i} className="print-agenda-item">
                      <span
                        className="print-cat-dot"
                        style={{ background: CATEGORIES[ev.category]?.color }}
                      />
                      <span className="print-agenda-date">
                        {formatDateRange(ev.startDate, ev.endDate)}
                      </span>
                      <span className="print-agenda-name">{ev.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {(() => {
                const monthCats = [...new Set(allMonthsAgenda[month].events.map((ev) => ev.category))];
                if (monthCats.length === 0) return null;
                return (
                  <div className="print-all-legend">
                    <div className="print-section-title">Legend</div>
                    <div className="print-legend-items">
                      {monthCats.map((name) => (
                        <span key={name} className="print-legend-item">
                          <span
                            className="print-legend-swatch"
                            style={{ background: CATEGORIES[name]?.color }}
                          />
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      )}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;
