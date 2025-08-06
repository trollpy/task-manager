import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import PropTypes from 'prop-types';

const TaskTemplates = ({ templates, onCreate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newTemplate);
    setIsModalOpen(false);
    setNewTemplate({
      name: '',
      description: '',
      priority: 'Medium'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Task Templates</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + New Template
        </Button>
      </div>
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <Card key={template.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
                <Badge variant={template.priority === 'High' ? 'danger' : template.priority === 'Medium' ? 'warning' : 'success'}>
                  {template.priority}
                </Badge>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => onDelete(template.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No task templates created yet</p>
        </Card>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Template"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Template Name"
            name="name"
            value={newTemplate.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            name="description"
            value={newTemplate.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={newTemplate.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Create Template
          </Button>
        </form>
      </Modal>
    </div>
  );
};

TaskTemplates.propTypes = {
  templates: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskTemplates;