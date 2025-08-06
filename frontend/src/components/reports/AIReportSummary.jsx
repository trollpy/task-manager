import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

const AIReportSummary = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSummary(`Based on the team's performance data from the last month, here are the key insights:
      
1. The team completed 85% of assigned tasks, which is a 5% improvement from the previous month.
2. Task completion rates were highest on Tuesdays and Wednesdays.
3. High priority tasks had a 92% completion rate compared to 78% for medium priority tasks.
      
Recommendations:
- Consider scheduling more high-priority tasks early in the week
- Review workload distribution as some team members are consistently overperforming while others struggle
- Implement additional training for time management techniques`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">AI Generated Summary</h3>
        <Button size="sm" onClick={generateSummary} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : 'Generate'}
        </Button>
      </div>
      {summary ? (
        <div className="whitespace-pre-line p-3 bg-gray-50 rounded">
          {summary}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Click "Generate" to create an AI-powered summary of your team's performance
        </p>
      )}
    </Card>
  );
};

export default AIReportSummary;