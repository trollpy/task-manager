import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PropTypes from 'prop-types';

const NotificationSettings = ({ settings, onUpdate }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: settings.email,
    push: settings.push,
    taskAssigned: settings.taskAssigned,
    taskUpdated: settings.taskUpdated,
    taskDue: settings.taskDue
  });

  const handleToggle = (field) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    onUpdate(notificationSettings);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => handleToggle('email')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications in the app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => handleToggle('push')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium mb-4">Notification Types</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Task Assigned</h4>
              <p className="text-sm text-gray-500">When you're assigned a new task</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.taskAssigned}
                onChange={() => handleToggle('taskAssigned')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Task Updated</h4>
              <p className="text-sm text-gray-500">When a task you're assigned to is updated</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.taskUpdated}
                onChange={() => handleToggle('taskUpdated')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Task Due</h4>
              <p className="text-sm text-gray-500">Reminders when tasks are due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.taskDue}
                onChange={() => handleToggle('taskDue')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
      <Button onClick={handleSubmit} className="w-full md:w-auto">
        Save Notification Settings
      </Button>
    </div>
  );
};

NotificationSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default NotificationSettings;