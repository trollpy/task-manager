import { useState } from 'react';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import PropTypes from 'prop-types';

const RoleManager = ({ user, roles, onRoleUpdate }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleUpdate = () => {
    onRoleUpdate(user.id, selectedRole);
  };

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Manage Roles</h3>
      <div className="flex items-center space-x-2">
        <Dropdown
          trigger={
            <button className="px-3 py-1 border rounded-md">
              {selectedRole}
            </button>
          }
        >
          {roles.map(role => (
            <button
              key={role}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </Dropdown>
        <Button size="sm" onClick={handleRoleUpdate}>
          Update
        </Button>
      </div>
    </Card>
  );
};

RoleManager.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  onRoleUpdate: PropTypes.func.isRequired
};

export default RoleManager;