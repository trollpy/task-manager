import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import PropTypes from 'prop-types';

const UserSettings = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">User Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
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
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-3">Change Password</h3>
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

UserSettings.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default UserSettings;