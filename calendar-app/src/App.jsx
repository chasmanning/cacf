import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, MONTH_NAMES } from './constants';
import { isMonthLevel, formatDateRange, parseDate } from './utils';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import YearGrid from './components/YearGrid';
import MultiMonthView from './components/MultiMonthView';
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

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
  }, [filteredEvents]);

  const activeCategoryList = useMemo(() => {
    return Object.entries(CATEGORIES).filter(([name]) => activeCategories.has(name));
  }, [activeCategories]);

  const isMultiMonth = view === '1mo' || view === '2mo' || view === '3mo';
  const monthCount = view === '1mo' ? 1 : view === '2mo' ? 2 : view === '3mo' ? 3 : 0;

  return (
    <div className="app">
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
          <button className="print-btn" onClick={() => window.print()}>
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print PDF
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
      {/* Print-only legend and event list */}
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
        <div className="print-event-list">
          <div className="print-section-title">Events</div>
          <table className="print-event-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedEvents.map((ev, i) => (
                <tr key={i}>
                  <td>{formatDateRange(ev.startDate, ev.endDate)}</td>
                  <td>{ev.name}</td>
                  <td>
                    <span
                      className="print-cat-dot"
                      style={{ background: CATEGORIES[ev.category]?.color }}
                    />
                    {ev.category}
                  </td>
                  <td>{ev.status !== 'nan' ? ev.status : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;
