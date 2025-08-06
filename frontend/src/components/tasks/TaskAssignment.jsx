import { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';

const TaskAssignment = ({ task, users, onAssign }) => {
  const [assignee, setAssignee] = useState(task.assignee || '');

  const handleAssign = () => {
    onAssign(task.id, assignee);
  };

  return (
    <div className="flex items-center space-x-2">
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md">
            {assignee || 'Select assignee'}
          </button>
        }
      >
        {users.map(user => (
          <button
            key={user.id}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setAssignee(user.name)}
          >
            {user.name}
          </button>
        ))}
      </Dropdown>
      <Button size="sm" onClick={handleAssign}>
        Assign
      </Button>
    </div>
  );
};

TaskAssignment.propTypes = {
  task: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onAssign: PropTypes.func.isRequired
};

export default TaskAssignment;