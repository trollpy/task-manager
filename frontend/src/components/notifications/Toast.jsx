import { useEffect } from 'react';
import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const Toast = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const variantMap = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'primary'
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <div className={`bg-white border rounded-lg shadow-lg overflow-hidden ${notification.type === 'error' ? 'border-red-200' : notification.type === 'success' ? 'border-green-200' : 'border-blue-200'}`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Badge variant={variantMap[notification.type]}>
                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </Badge>
            </div>
            <div className="ml-3 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
              <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => onDismiss(notification.id)}
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  notification: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Toast;