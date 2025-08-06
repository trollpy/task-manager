import { createContext, useContext, useState, useEffect } from 'react';
import { getTasks } from '../services/tasks';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    setLoading(true);
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      throw error;
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