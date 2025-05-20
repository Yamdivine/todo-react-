import { format } from 'date-fns';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { title, description, completed, createdAt, dueDate, priority } = todo;

  const priorityColors = {
    'High': 'text-red-500',
    'Medium': 'text-yellow-500',
    'Low': 'text-green-500',
    'No Priority': 'text-gray-400'
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed;

  return (
    <div className="todo-card">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="h-5 w-5 rounded border-gray-600 text-blue-accent focus:ring-blue-accent bg-light-navy"
          />
        </div>
        
        <div className="ml-3 flex-grow">
          <div className="flex justify-between">
            <h3 className={`text-lg font-medium ${completed ? 'line-through text-gray-500' : ''}`}>
              {title}
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={onEdit}
                className="text-gray-400 hover:text-white"
                aria-label="Edit todo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500"
                aria-label="Delete todo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {description && (
            <p className={`mt-1 text-sm ${completed ? 'text-gray-500' : 'text-gray-300'}`}>
              {description}
            </p>
          )}
          
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-gray-400">
              Created: {format(new Date(createdAt), 'MMM d, yyyy')}
            </span>
            
            {dueDate && (
              <span className={`${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
                Due: {format(new Date(dueDate), 'MMM d, yyyy')}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
            
            {priority !== 'No Priority' && (
              <span className={priorityColors[priority]}>
                {priority} Priority
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;