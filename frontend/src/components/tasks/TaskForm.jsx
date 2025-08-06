import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import PropTypes from 'prop-types';

const TaskForm = ({ onSubmit, initialValues, users }) => {
  const [formData, setFormData] = useState(initialValues || {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
    assignee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        as="textarea"
        rows={3}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <Dropdown
            trigger={
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.priority}
              </button>
            }
          >
            {['High', 'Medium', 'Low'].map(priority => (
              <button
                key={priority}
                type="button"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setFormData(prev => ({ ...prev, priority }))}
              >
                {priority}
              </button>
            ))}
          </Dropdown>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <Dropdown
            trigger={
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.status}
              </button>
            }
          >
            {['Pending', 'In Progress', 'Completed'].map(status => (
              <button
                key={status}
                type="button"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setFormData(prev => ({ ...prev, status }))}
              >
                {status}
              </button>
            ))}
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <Dropdown
            trigger={
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.assignee || 'Select assignee'}
              </button>
            }
          >
            {users.map(user => (
              <button
                key={user.id}
                type="button"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setFormData(prev => ({ ...prev, assignee: user.name }))}
              >
                {user.name}
              </button>
            ))}
          </Dropdown>
        </div>
      </div>
      <Button type="submit" className="w-full">
        {initialValues ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TaskForm;