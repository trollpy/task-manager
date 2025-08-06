import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const NotificationCenter = ({ notifications, onMarkAsRead }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'task' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('task')}
        >
          Tasks
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'system' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('system')}
        >
          System
        </button>
      </div>
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">{notification.time}</span>
                  {!notification.read && (
                    <Badge variant="primary" size="sm" className="mt-1">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              {!notification.read && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No notifications</p>
          </Card>
        )}
      </div>
    </div>
  );
};

NotificationCenter.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkAsRead: PropTypes.func.isRequired
};

export default NotificationCenter;