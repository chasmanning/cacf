import { createPortal } from 'react-dom';
import { useCategories } from '../CategoryContext';
import { formatDateRange } from '../utils';
import './Tooltip.css';

function Tooltip({ event, allEvents, x, y }) {
  const categories = useCategories();
  const events = allEvents || [event];

  return createPortal(
    <div className="tooltip" style={{ left: x, top: y - 8 }}>
      {events.map((ev, i) => {
        const cat = categories[ev.category] || {};
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
              {formatDateRange(ev.startDate, ev.endDate)}
            </div>
            <div className="tooltip-row tooltip-meta">
              {ev.category}
            </div>
          </div>
        );
      })}
    </div>,
    document.body
  );
}

export default Tooltip;
