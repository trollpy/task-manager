import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import KanbanBoard from '../components/tasks/KanbanBoard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/tasks/TaskForm';

const Tasks = () => {
  const [view, setView] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the client proposal document and share with team',
      status: 'Completed',
      priority: 'High',
      dueDate: '2023-05-15',
      assignee: 'John Doe'
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review pull requests for the new feature branch',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2023-05-18',
      assignee: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Update API documentation for new endpoints',
      status: 'Pending',
      priority: 'Low',
      dueDate: '2023-05-20',
      assignee: 'Mike Johnson'
    }
  ]);

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
  };

  const handleTaskUpdate = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex space-x-3">
          <Button 
            variant={view === 'list' ? 'primary' : 'secondary'} 
            size="sm"
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button 
            variant={view === 'kanban' ? 'primary' : 'secondary'} 
            size="sm"
            onClick={() => setView('kanban')}
          >
            Kanban View
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            + New Task
          </Button>
        </div>
      </div>
      {view === 'list' ? (
        <TaskList tasks={tasks} />
      ) : (
        <KanbanBoard 
          tasks={tasks} 
          onTaskUpdate={handleTaskUpdate} 
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <TaskForm 
          onSubmit={handleCreateTask} 
          users={[
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Smith' },
            { id: '3', name: 'Mike Johnson' }
          ]} 
        />
      </Modal>
    </div>
  );
};

export default Tasks;