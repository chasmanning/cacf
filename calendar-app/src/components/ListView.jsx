import { useMemo, useState } from 'react';
import { MONTH_NAMES, CATEGORIES } from '../constants';
import { parseDate, formatDateRange } from '../utils';
import './ListView.css';

function ListView({ events, onEventClick }) {
  const [sortBy, setSortBy] = useState('date');

  const grouped = useMemo(() => {
    const sorted = [...events].sort((a, b) => {
      if (sortBy === 'date') return parseDate(a.startDate) - parseDate(b.startDate);
      if (sortBy === 'category') return a.category.localeCompare(b.category) || parseDate(a.startDate) - parseDate(b.startDate);
      if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '') || parseDate(a.startDate) - parseDate(b.startDate);
      return 0;
    });

    if (sortBy !== 'date') return { all: sorted };

    const groups = {};
    for (const ev of sorted) {
      const d = parseDate(ev.startDate);
      const monthKey = d.getMonth();
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(ev);
    }
    return groups;
  }, [events, sortBy]);

  return (
    <div className="list-view">
      <div className="list-controls">
        <span className="list-sort-label">Sort by:</span>
        {['date', 'category', 'status'].map((s) => (
          <button
            key={s}
            className={`list-sort-btn ${sortBy === s ? 'active' : ''}`}
            onClick={() => setSortBy(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="list-body">
        {sortBy === 'date'
          ? Object.entries(grouped).map(([monthKey, evts]) => (
              <div key={monthKey} className="list-month-group">
                <h3 className="list-month-header">{MONTH_NAMES[Number(monthKey)]}</h3>
                {evts.map((ev, i) => (
                  <ListRow key={i} event={ev} onClick={() => onEventClick(ev)} />
                ))}
              </div>
            ))
          : grouped.all?.map((ev, i) => (
              <ListRow key={i} event={ev} onClick={() => onEventClick(ev)} />
            ))
        }
      </div>
    </div>
  );
}

function ListRow({ event, onClick }) {
  const cat = CATEGORIES[event.category] || {};
  return (
    <div className="list-row" onClick={onClick}>
      <div className="list-date">{formatDateRange(event.startDate, event.endDate)}</div>
      <div className="list-name">{event.name}</div>
      <div className="list-cat-badge" style={{ backgroundColor: cat.color, color: cat.textColor }}>
        {event.category}
      </div>
      <div className={`list-status ${event.status?.toLowerCase()}`}>
        {event.status === 'nan' ? '—' : event.status}
      </div>
    </div>
  );
}

export default ListView;
