import DashboardStats from '../components/dashboard/DashboardStats';
import TaskSummary from '../components/dashboard/TaskSummary';
import RecentTasks from '../components/dashboard/RecentTasks';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import AIInsights from '../components/dashboard/AIInsights';

const Dashboard = () => {
  const stats = {
    totalTasks: 42,
    completedTasks: 28,
    inProgressTasks: 10,
    overdueTasks: 4,
    tasksChange: 12,
    completedChange: 8
  };

  const taskStatusData = [
    { name: 'Completed', value: 28 },
    { name: 'In Progress', value: 10 },
    { name: 'Pending', value: 4 }
  ];

  const recentTasks = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the client proposal document and share with team',
      status: 'Completed',
      dueDate: '2023-05-15',
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review pull requests for the new feature branch',
      status: 'In Progress',
      dueDate: '2023-05-18',
      assignedTo: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Update API documentation for new endpoints',
      status: 'Pending',
      dueDate: '2023-05-20',
      assignedTo: 'Mike Johnson'
    }
  ];

  const performanceData = [
    { name: 'Jan', completed: 12, assigned: 15 },
    { name: 'Feb', completed: 18, assigned: 20 },
    { name: 'Mar', completed: 15, assigned: 18 },
    { name: 'Apr', completed: 22, assigned: 25 },
    { name: 'May', completed: 19, assigned: 22 },
    { name: 'Jun', completed: 25, assigned: 28 }
  ];

  const aiInsights = [
    'Team is completing tasks 15% faster than last month',
    'High priority tasks have a 92% completion rate',
    'Recommend assigning more tasks to John who has 98% completion rate',
    'Wednesday is the most productive day of the week'
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskSummary data={taskStatusData} />
          <PerformanceChart data={performanceData} />
        </div>
        <div className="space-y-6">
          <RecentTasks tasks={recentTasks} />
          <AIInsights insights={aiInsights} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;