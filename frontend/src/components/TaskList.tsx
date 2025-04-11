import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { useUserContext } from '../services/context';
export const TaskList = () => {
  const { userId } = useUserContext();
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskService.getTasks(userId!);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  // Create task
  const createTask = async (title: string) => {
    try {
      const response = await taskService.createTask({ content: title, isCompleted: false, userId: userId! });
      setTasks(prev => [...prev, response.data]);
      setNewTask('');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  // Update task
  const updateTask = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const response = await taskService.updateTask(id, { 
        content: task.content,
        isCompleted: !task.isCompleted
      });
      setError(null);
      setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    //TODO: Implement this
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      createTask(newTask.trim());
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            taskId={task.id}
            onToggle={updateTask}
          />
        ))}
        {tasks.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}; 

export const TaskItem = ({ taskId, onToggle }) => {
  const { userId } = useUserContext();
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);
  
  const fetchTask = async () => {
    try {
      setIsLoading(true);
      const response = await taskService.getTasks(userId!);
      setTask(response.data.find(t => t.id === taskId));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div >
      <div >
        <div
          onClick={() => onToggle(task.id)}
        >
          <div>
            {task.isCompleted ? 'En cours' : 'Terminé'}
          </div>
        </div>
        <div >
          {task.content}
        </div>
      </div>
      <div
      >
        Supprimer
      </div>
    </div>
  );
}; 