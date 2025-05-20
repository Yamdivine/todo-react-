import { useState } from 'react';

const TodoForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
  );
  const [priority, setPriority] = useState(initialData.priority || 'No Priority');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description: description || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
    });
  };

  return (
    <div className="bg-navy rounded-lg p-4 mt-4">
      <h2 className="text-lg font-medium mb-4">
        {initialData.id ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description (optional)
          </label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Add more details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date (optional)
            </label>
            <div className="relative">
              <input
                type="date"
                className="input pr-10"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Priority (optional)
            </label>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="No Priority">No Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="btn bg-light-navy hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialData.id ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;