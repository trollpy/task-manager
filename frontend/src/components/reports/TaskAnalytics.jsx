import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TaskAnalytics = () => {
  const statusData = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 15 },
    { name: 'Pending', value: 10 }
  ];

  const priorityData = [
    { name: 'High', value: 25 },
    { name: 'Medium', value: 30 },
    { name: 'Low', value: 15 }
  ];

  const trendData = [
    { name: 'Mon', completed: 5 },
    { name: 'Tue', completed: 8 },
    { name: 'Wed', completed: 6 },
    { name: 'Thu', completed: 10 },
    { name: 'Fri', completed: 7 },
    { name: 'Sat', completed: 3 },
    { name: 'Sun', completed: 1 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-4">Tasks by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-4">Tasks by Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="p-4">
        <h3 className="font-medium mb-4">Weekly Completion Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default TaskAnalytics;