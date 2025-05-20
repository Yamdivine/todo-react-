const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="input pr-8 appearance-none"
      >
        <option value="Newest first">Newest first</option>
        <option value="Oldest first">Oldest first</option>
        <option value="Due date">Due date</option>
        <option value="Priority">Priority</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;