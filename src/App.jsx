import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest first');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
      setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
    
    // Filter and sort todos
    let result = [...todos];
    
    // Apply filter
    if (filter === 'Active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'Completed') {
      result = result.filter(todo => todo.completed);
    }
    
    // Apply search
    if (searchQuery) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply sort
    if (sort === 'Newest first') {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sort === 'Oldest first') {
      result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sort === 'Due date') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      });
    } else if (sort === 'Priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2, 'No Priority': 3 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    
    setFilteredTodos(result);
  }, [todos, filter, sort, searchQuery]);

  const addTodo = (todo) => {
    const newTodo = {
      id: crypto.randomUUID(),
      ...todo,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
    setShowForm(false);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-navy text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="mb-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <FilterTabs filter={filter} setFilter={setFilter} todos={todos} />
          <SortDropdown sort={sort} setSort={setSort} />
        </div>
        
        {filteredTodos.length === 0 && (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {filter === 'All' ? 'No todos' : 
             filter === 'Active' ? 'No active todos' : 'No completed todos'}
          </div>
        )}
        
        <TodoList 
          todos={filteredTodos} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          darkMode={darkMode}
        />
        
        {showForm ? (
          <TodoForm 
            onSubmit={addTodo} 
            onCancel={() => setShowForm(false)}
            darkMode={darkMode}
          />
        ) : (
          <button 
            className={`w-full py-3 rounded-lg flex items-center justify-center mt-4 ${
              darkMode 
                ? 'bg-navy hover:bg-light-navy text-blue-accent' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
            }`}
            onClick={() => setShowForm(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Todo
          </button>
        )}
        
        <div className={`text-center text-sm mt-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Made with React, Vite, and Tailwind CSS
        </div>
      </div>
    </div>
  );
}

export default App;