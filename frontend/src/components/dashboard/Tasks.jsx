import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../services/tasks'
import TaskList from '../components/tasks/TaskList'
import TaskFilters from '../components/tasks/TaskFilters'
import { Button } from '../components/ui'
import { Plus } from 'lucide-react'
import TaskModal from '../components/tasks/TaskModal'

export default function Tasks() {
  const [filters, setFilters] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasks(filters)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />
      
      <TaskList tasks={tasks} loading={isLoading} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}