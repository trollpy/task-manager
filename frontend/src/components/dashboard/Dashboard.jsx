import { useQuery } from '@tanstack/react-query'
import { getTaskStats, getRecentTasks } from '../services/tasks'
import DashboardStats from '../components/dashboard/DashboardStats'
import TaskSummary from '../components/dashboard/TaskSummary'
import RecentTasks from '../components/dashboard/RecentTasks'
import PerformanceChart from '../components/dashboard/PerformanceChart'

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['taskStats'],
    queryFn: getTaskStats
  })

  const { data: recentTasks } = useQuery({
    queryKey: ['recentTasks'],
    queryFn: getRecentTasks
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <DashboardStats stats={stats} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <TaskSummary stats={stats} />
          <PerformanceChart />
        </div>
        <div className="space-y-6">
          <RecentTasks tasks={recentTasks} />
        </div>
      </div>
    </div>
  )
}