import { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockUsers = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            department: 'Engineering',
            organizationId: 'org123'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Manager',
            department: 'Marketing',
            organizationId: 'org123'
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'Member',
            department: 'Sales',
            organizationId: 'org123'
          }
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (newUser) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const userWithId = { ...newUser, id: Date.now().toString() };
      setUsers(prev => [...prev, userWithId]);
      return userWithId;
    } catch (error) {
      throw new Error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updates) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, ...updates } : user
        )
      );
    } catch (error) {
      throw new Error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      throw new Error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        users, 
        loading, 
        createUser, 
        updateUser, 
        deleteUser 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UserContext);
};