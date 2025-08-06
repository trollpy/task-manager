import { useState, useContext, createContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (notification) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...notification, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message) => {
    addToast({
      type: 'success',
      title: 'Success',
      message
    });
  };

  const showError = (message) => {
    addToast({
      type: 'error',
      title: 'Error',
      message
    });
  };

  const showWarning = (message) => {
    addToast({
      type: 'warning',
      title: 'Warning',
      message
    });
  };

  const showInfo = (message) => {
    addToast({
      type: 'info',
      title: 'Info',
      message
    });
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        toasts,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};