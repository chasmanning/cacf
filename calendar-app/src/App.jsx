import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from './constants';
import { isMonthLevel } from './utils';
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
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;
