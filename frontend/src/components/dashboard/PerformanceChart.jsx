import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import PropTypes from 'prop-types';

const PerformanceChart = ({ data }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
            <Line type="monotone" dataKey="assigned" stroke="#3b82f6" name="Assigned" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

PerformanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      completed: PropTypes.number.isRequired,
      assigned: PropTypes.number.isRequired
    })
  ).isRequired
};

export default PerformanceChart;