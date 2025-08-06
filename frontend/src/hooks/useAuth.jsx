import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'Admin',
        organizationId: 'org123'
      };
      setUser(mockUser);
      navigate('/');
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        name,
        email,
        role: 'Admin',
        organizationId: null // No org until setup
      };
      setUser(mockUser);
      navigate('/company-setup');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const setupCompany = async (companyName, logo) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({
        ...prev,
        organizationId: 'org123'
      }));
      navigate('/');
    } catch (error) {
      throw new Error('Company setup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        setupCompany, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};