import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TeamStats = ({ stats }) => {
  const roleData = [
    { name: 'Admins', value: stats.admins },
    { name: 'Managers', value: stats.managers },
    { name: 'Members', value: stats.members }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="font-medium mb-4">Team Composition</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Team Members</p>
            <p className="text-2xl font-bold">{stats.totalMembers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Today</p>
            <p className="text-2xl font-bold">{stats.activeToday}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Tasks per Member</p>
            <p className="text-2xl font-bold">{stats.avgTasks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

TeamStats.propTypes = {
  stats: PropTypes.shape({
    admins: PropTypes.number.isRequired,
    managers: PropTypes.number.isRequired,
    members: PropTypes.number.isRequired,
    totalMembers: PropTypes.number.isRequired,
    activeToday: PropTypes.number.isRequired,
    avgTasks: PropTypes.number.isRequired
  }).isRequired
};

export default TeamStats;