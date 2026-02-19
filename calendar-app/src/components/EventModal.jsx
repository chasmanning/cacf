import { useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { formatDateRange, daysBetween } from '../utils';
import './EventModal.css';

function EventModal({ event, onClose }) {
  const cat = CATEGORIES[event.category] || {};
  const span = daysBetween(event.startDate, event.endDate) + 1;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-badge" style={{ backgroundColor: cat.color, color: cat.textColor }}>
          {event.category}
        </div>
        <h2 className="modal-title">{event.name}</h2>
        <div className="modal-details">
          <div className="modal-detail-row">
            <span className="modal-detail-label">Date</span>
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          {span > 1 && (
            <div className="modal-detail-row">
              <span className="modal-detail-label">Duration</span>
              <span>{span} days</span>
            </div>
          )}
          <div className="modal-detail-row">
            <span className="modal-detail-label">Status</span>
            <span className={`modal-status ${event.status?.toLowerCase()}`}>
              {event.status === 'nan' ? 'Not specified' : event.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
