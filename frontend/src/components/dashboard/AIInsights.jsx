import Card from '../ui/Card';
import PropTypes from 'prop-types';

const AIInsights = ({ insights }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">AI Insights</h3>
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Beta</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="ml-3 text-sm">{insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

AIInsights.propTypes = {
  insights: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AIInsights;