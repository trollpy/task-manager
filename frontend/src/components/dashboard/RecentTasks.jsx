import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const statusColors = {
  'Completed': 'green',
  'In Progress': 'blue',
  'Overdue': 'red',
  'Pending': 'yellow'
};

const RecentTasks = ({ tasks }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border-b pb-3 last:border-b-0">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{task.title}</h4>
              <Badge variant={statusColors[task.status] || 'default'}>
                {task.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
              <span className="text-xs text-gray-400">Assigned to: {task.assignedTo}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

RecentTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      assignedTo: PropTypes.string.isRequired
    })
  ).isRequired
};

export default RecentTasks;