import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const priorityColors = {
  'High': 'red',
  'Medium': 'yellow',
  'Low': 'green'
};

const statusColors = {
  'Completed': 'green',
  'In Progress': 'blue',
  'Pending': 'gray'
};

const TaskCard = ({ task }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex space-x-2">
          <Badge variant={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
          <Badge variant={statusColors[task.status]}>
            {task.status}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{task.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
        <span className="text-xs text-gray-500">Assigned to: {task.assignee}</span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired
  }).isRequired
};

export default TaskCard;