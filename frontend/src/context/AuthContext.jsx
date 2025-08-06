import { createContext, useContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const { data } = await api.get('/auth/me')
          setUser(data)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials)
      localStorage.setItem('token', data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      setUser(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  const setupCompany = async (companyData) => {
    try {
      const { data } = await api.post('/organizations/setup', companyData)
      localStorage.setItem('token', data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      setUser(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Company setup failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    queryClient.clear()
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setupCompany }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
