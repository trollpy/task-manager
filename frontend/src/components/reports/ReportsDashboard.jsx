import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PerformanceReport from './PerformanceReport';
import TaskAnalytics from './TaskAnalytics';
import ExportOptions from './ExportOptions';

const ReportsDashboard = () => {
  const [activeTab, setActiveTab] = useState('performance');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reports</h2>
        <div className="flex space-x-2">
          <Button variant="secondary">Generate AI Summary</Button>
          <ExportOptions />
        </div>
      </div>
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'performance' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Task Analytics
        </button>
      </div>
      <div className="pt-4">
        {activeTab === 'performance' ? <PerformanceReport /> : <TaskAnalytics />}
      </div>
    </div>
  );
};

export default ReportsDashboard;