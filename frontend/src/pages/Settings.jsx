import { useState } from 'react';
import CompanySettings from '../components/settings/CompanySettings';
import UserSettings from '../components/settings/UserSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeToggle from '../components/settings/ThemeToggle';
import TaskTemplates from '../components/settings/TaskTemplates';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const company = {
    name: 'Acme Inc',
    logo: '/logo.png'
  };

  const user = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  const notificationSettings = {
    email: true,
    push: true,
    taskAssigned: true,
    taskUpdated: true,
    taskDue: true
  };

  const templates = [
    {
      id: '1',
      name: 'Weekly Meeting',
      description: 'Prepare agenda and notes for weekly team meeting',
      priority: 'Medium'
    },
    {
      id: '2',
      name: 'Client Report',
      description: 'Generate monthly report for client',
      priority: 'High'
    }
  ];

  const handleCompanyUpdate = (updates) => {
    console.log('Company updates:', updates);
  };

  const handleUserUpdate = (updates) => {
    console.log('User updates:', updates);
  };

  const handleNotificationUpdate = (updates) => {
    console.log('Notification updates:', updates);
  };

  const handleTemplateCreate = (template) => {
    console.log('New template:', template);
  };

  const handleTemplateDelete = (id) => {
    console.log('Delete template:', id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'company' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('company')}
        >
          Company
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'user' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('user')}
        >
          User
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'templates' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>
      <div className="pt-4">
        {activeTab === 'company' && (
          <CompanySettings company={company} onUpdate={handleCompanyUpdate} />
        )}
        {activeTab === 'user' && (
          <UserSettings user={user} onUpdate={handleUserUpdate} />
        )}
        {activeTab === 'notifications' && (
          <NotificationSettings 
            settings={notificationSettings} 
            onUpdate={handleNotificationUpdate} 
          />
        )}
        {activeTab === 'templates' && (
          <TaskTemplates 
            templates={templates} 
            onCreate={handleTemplateCreate} 
            onDelete={handleTemplateDelete} 
          />
        )}
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Settings;