import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
        <p className="text-2xl font-bold">{stats.totalTasks}</p>
        <Badge variant={stats.tasksChange >= 0 ? 'success' : 'danger'}>
          {stats.tasksChange >= 0 ? '+' : ''}{stats.tasksChange}% from last week
        </Badge>
      </Card>
      <Card>
        <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
        <p className="text-2xl font-bold">{stats.completedTasks}</p>
        <Badge variant={stats.completedChange >= 0 ? 'success' : 'danger'}>
          {stats.completedChange >= 0 ? '+' : ''}{stats.completedChange}% from last week
        </Badge>
      </Card>
      <Card>
        <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
        <p className="text-2xl font-bold">{stats.inProgressTasks}</p>
      </Card>
      <Card>
        <h3 className="text-gray-500 text-sm font-medium">Overdue</h3>
        <p className="text-2xl font-bold text-red-600">{stats.overdueTasks}</p>
      </Card>
    </div>
  );
};

DashboardStats.propTypes = {
  stats: PropTypes.shape({
    totalTasks: PropTypes.number.isRequired,
    completedTasks: PropTypes.number.isRequired,
    inProgressTasks: PropTypes.number.isRequired,
    overdueTasks: PropTypes.number.isRequired,
    tasksChange: PropTypes.number.isRequired,
    completedChange: PropTypes.number.isRequired
  }).isRequired
};

export default DashboardStats;