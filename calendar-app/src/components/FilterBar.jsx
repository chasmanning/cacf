import { useCategories } from '../CategoryContext';
import './FilterBar.css';

function FilterBar({ activeCategories, toggleCategory, selectAll, selectNone }) {
  const categories = useCategories();

  return (
    <div className="filter-bar">
      <div className="filter-pills">
        {Object.entries(categories).map(([name, { color, textColor }]) => {
          const active = activeCategories.has(name);
          return (
            <button
              key={name}
              className={`filter-pill ${active ? 'active' : 'inactive'}`}
              style={{
                backgroundColor: active ? color : 'transparent',
                color: active ? textColor : '#999',
                borderColor: color,
              }}
              onClick={() => toggleCategory(name)}
            >
              <span className={active ? '' : 'strike'}>{name}</span>
            </button>
          );
        })}
      </div>
      <div className="filter-actions">
        <button className="filter-action" onClick={selectAll}>All</button>
        <button className="filter-action" onClick={selectNone}>None</button>
      </div>
    </div>
  );
}

export default FilterBar;
