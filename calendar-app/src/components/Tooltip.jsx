import { createPortal } from 'react-dom';
import { CATEGORIES } from '../constants';
import { formatDateRange } from '../utils';
import './Tooltip.css';

function Tooltip({ event, x, y }) {
  const cat = CATEGORIES[event.category] || {};
  return createPortal(
    <div className="tooltip" style={{ left: x, top: y - 8 }}>
      <div className="tooltip-header">
        <span
          className="tooltip-cat-dot"
          style={{ backgroundColor: cat.color }}
        />
        <span className="tooltip-name">{event.name}</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">Category:</span> {event.category}
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">Date:</span> {formatDateRange(event.startDate, event.endDate)}
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">Status:</span>
        <span className={`tooltip-status ${event.status?.toLowerCase()}`}>
          {event.status === 'nan' ? '—' : event.status}
        </span>
      </div>
    </div>,
    document.body
  );
}

export default Tooltip;
