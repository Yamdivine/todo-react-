const FilterTabs = ({ filter, setFilter, todos }) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex space-x-2">
      <button
        className={`filter-tab ${filter === 'All' ? 'active' : 'inactive'}`}
        onClick={() => setFilter('All')}
      >
        All ({todos.length})
      </button>
      <button
        className={`filter-tab ${filter === 'Active' ? 'active' : 'inactive'}`}
        onClick={() => setFilter('Active')}
      >
        Active ({activeCount})
      </button>
      <button
        className={`filter-tab ${filter === 'Completed' ? 'active' : 'inactive'}`}
        onClick={() => setFilter('Completed')}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
};

export default FilterTabs;