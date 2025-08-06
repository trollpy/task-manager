import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

const UserForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {
    name: '',
    email: '',
    role: 'Member',
    department: ''
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
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <Dropdown
          trigger={
            <button
              type="button"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {formData.role}
            </button>
          }
        >
          {['Admin', 'Manager', 'Member'].map(role => (
            <button
              key={role}
              type="button"
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setFormData(prev => ({ ...prev, role }))}
            >
              {role}
            </button>
          ))}
        </Dropdown>
      </div>
      <Input
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        {initialValues ? 'Update User' : 'Add User'}
      </Button>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

export default UserForm;