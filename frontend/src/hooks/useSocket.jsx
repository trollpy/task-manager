import { useState, useEffect, useContext, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001', {
      withCredentials: true,
      autoConnect: false
    });

    setSocket(newSocket);

    // Connect when component mounts
    newSocket.connect();

    // Setup event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('notification', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const emitEvent = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <SocketContext.Provider 
      value={{ 
        socket, 
        notifications,
        emitEvent,
        markNotificationAsRead
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};