import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="flex justify-center p-8">Loading...</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth