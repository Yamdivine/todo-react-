export type Priority = 'No Priority' | 'Low' | 'Medium' | 'High';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: Priority;
}

export default Todo;