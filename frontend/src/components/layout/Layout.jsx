import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useTheme } from '../../context/ThemeContext'

export default function Layout() {
  const { theme } = useTheme()

  return (
    <div className={`flex h-screen ${theme}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
          <Outlet />
        </main>
      </div>
    </div>
  )
}