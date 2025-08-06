import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (message) => {
    addNotification({
      type: 'success',
      title: 'Success',
      message
    });
  };

  const showError = (message) => {
    addNotification({
      type: 'error',
      title: 'Error',
      message
    });
  };

  const showWarning = (message) => {
    addNotification({
      type: 'warning',
      title: 'Warning',
      message
    });
  };

  const showInfo = (message) => {
    addNotification({
      type: 'info',
      title: 'Info',
      message
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};