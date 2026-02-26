import { useEffect } from 'react';
import { useCategories } from '../CategoryContext';
import { formatDateRange } from '../utils';
import './EventModal.css';

function EventModal({ event, onClose }) {
  const categories = useCategories();
  const cat = categories[event.category] || {};

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
        <h2 className="modal-title">{event.name}</h2>
        <div className="modal-date">{formatDateRange(event.startDate, event.endDate)}</div>
        <div className="modal-badge" style={{ backgroundColor: cat.color, color: cat.textColor }}>
          {event.category}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
