import { createPortal } from 'react-dom';
import { CATEGORIES } from '../constants';
import { formatDateRange } from '../utils';
import './Tooltip.css';

function Tooltip({ event, allEvents, x, y }) {
  const events = allEvents || [event];

  return createPortal(
    <div className="tooltip" style={{ left: x, top: y - 8 }}>
      {events.map((ev, i) => {
        const cat = CATEGORIES[ev.category] || {};
        return (
          <div key={i} className={`tooltip-event ${i > 0 ? 'tooltip-event-extra' : ''}`}>
            <div className="tooltip-header">
              <span
                className="tooltip-cat-dot"
                style={{ backgroundColor: cat.color }}
              />
              <span className="tooltip-name">{ev.name}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Category:</span> {ev.category}
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Date:</span> {formatDateRange(ev.startDate, ev.endDate)}
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Status:</span>
              <span className={`tooltip-status ${ev.status?.toLowerCase()}`}>
                {ev.status === 'nan' ? '—' : ev.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>,
    document.body
  );
}

export default Tooltip;
