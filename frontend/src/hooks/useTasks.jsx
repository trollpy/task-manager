import { useState, useEffect, useContext, createContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch tasks
    const fetchTasks = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockTasks = [
          {
            id: '1',
            title: 'Complete project proposal',
            description: 'Finish the client proposal document and share with team',
            status: 'Completed',
            priority: 'High',
            dueDate: '2023-05-15',
            assignee: 'John Doe',
            organizationId: 'org123'
          },
          {
            id: '2',
            title: 'Review code changes',
            description: 'Review pull requests for the new feature branch',
            status: 'In Progress',
            priority: 'Medium',
            dueDate: '2023-05-18',
            assignee: 'Jane Smith',
            organizationId: 'org123'
          },
          {
            id: '3',
            title: 'Update documentation',
            description: 'Update API documentation for new endpoints',
            status: 'Pending',
            priority: 'Low',
            dueDate: '2023-05-20',
            assignee: 'Mike Johnson',
            organizationId: 'org123'
          }
        ];
        setTasks(mockTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async (newTask) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const taskWithId = { ...newTask, id: Date.now().toString() };
      setTasks(prev => [...prev, taskWithId]);
      return taskWithId;
    } catch (error) {
      throw new Error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (error) {
      throw new Error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      throw new Error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        loading, 
        createTask, 
        updateTask, 
        deleteTask 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};