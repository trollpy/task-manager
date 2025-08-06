import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, ListChecks, Users, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/tasks', icon: ListChecks, label: 'Tasks' },
  { path: '/team', icon: Users, label: 'Team' },
  { path: '/reports', icon: BarChart2, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' }
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-border">
        <div className="flex items-center h-16 px-4 border-b border-border">
          <h1 className="text-xl font-semibold">SmartTasker</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                <item.icon className="flex-shrink-0 h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || '/default-avatar.png'}
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}