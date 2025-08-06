import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const PerformanceReport = () => {
  const data = [
    { name: 'Jan', completed: 12, overdue: 2 },
    { name: 'Feb', completed: 18, overdue: 1 },
    { name: 'Mar', completed: 15, overdue: 3 },
    { name: 'Apr', completed: 22, overdue: 1 },
    { name: 'May', completed: 19, overdue: 2 },
    { name: 'Jun', completed: 25, overdue: 0 }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-medium mb-4">Team Performance Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completed Tasks" />
              <Bar dataKey="overdue" fill="#ef4444" name="Overdue Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Top Performers</h4>
          <div className="space-y-3">
            {['John Doe', 'Jane Smith', 'Mike Johnson'].map((user, index) => (
              <div key={user} className="flex justify-between items-center">
                <span>{index + 1}. {user}</span>
                <span className="text-green-600">95%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h4 className="font-medium mb-2">Improvement Needed</h4>
          <div className="space-y-3">
            {['Sarah Williams', 'Tom Brown', 'Alex Green'].map((user, index) => (
              <div key={user} className="flex justify-between items-center">
                <span>{index + 1}. {user}</span>
                <span className="text-red-600">65%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h4 className="font-medium mb-2">AI Recommendations</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Consider redistributing tasks from Sarah to John</li>
            <li>Provide additional training on time management</li>
            <li>Review workload balance across teams</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReport;