import { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import PropTypes from 'prop-types';

const TaskFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignee: ''
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md text-sm">
            Status: {filters.status || 'All'}
          </button>
        }
      >
        <button
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => handleFilterChange('status', '')}
        >
          All
        </button>
        {['Pending', 'In Progress', 'Completed'].map(status => (
          <button
            key={status}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleFilterChange('status', status)}
          >
            {status}
          </button>
        ))}
      </Dropdown>
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md text-sm">
            Priority: {filters.priority || 'All'}
          </button>
        }
      >
        <button
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => handleFilterChange('priority', '')}
        >
          All
        </button>
        {['High', 'Medium', 'Low'].map(priority => (
          <button
            key={priority}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleFilterChange('priority', priority)}
          >
            {priority}
          </button>
        ))}
      </Dropdown>
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md text-sm">
            Assignee: {filters.assignee || 'All'}
          </button>
        }
      >
        <button
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => handleFilterChange('assignee', '')}
        >
          All
        </button>
        {['John Doe', 'Jane Smith', 'Mike Johnson'].map(assignee => (
          <button
            key={assignee}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleFilterChange('assignee', assignee)}
          >
            {assignee}
          </button>
        ))}
      </Dropdown>
    </div>
  );
};

TaskFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default TaskFilters;