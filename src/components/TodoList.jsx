import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = (updatedTodo) => {
    editTodo(editingId, updatedTodo);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {editingId === todo.id ? (
            <TodoForm
              initialData={todo}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
            />
          ) : (
            <TodoItem
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => handleEdit(todo.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;