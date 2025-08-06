import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import Button from '../ui/Button';

const TaskList = ({ tasks }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilterChange = (filters) => {
    let result = [...tasks];
    if (filters.status) {
      result = result.filter(task => task.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter(task => task.priority === filters.priority);
    }
    if (filters.assignee) {
      result = result.filter(task => task.assignee === filters.assignee);
    }
    setFilteredTasks(result);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button variant="primary">+ New Task</Button>
      </div>
      <TaskFilters onFilterChange={handleFilterChange} />
      <div className="mt-4 space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No tasks found matching your filters</p>
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TaskList;