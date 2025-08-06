import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SubtaskManager = ({ subtasks, onSubtaskUpdate }) => {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    const updatedSubtasks = [...subtasks, { id: Date.now(), title: newSubtask, completed: false }];
    onSubtaskUpdate(updatedSubtasks);
    setNewSubtask('');
  };

  const toggleSubtask = (id) => {
    const updatedSubtasks = subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    );
    onSubtaskUpdate(updatedSubtasks);
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Subtasks</h4>
      <div className="space-y-2">
        {subtasks.map(subtask => (
          <div key={subtask.id} className="flex items-center">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubtask(subtask.id)}
              className="mr-2"
            />
            <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
              {subtask.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-3">
        <Input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add new subtask"
          className="flex-1"
        />
        <Button size="sm" onClick={handleAddSubtask}>
          Add
        </Button>
      </div>
    </div>
  );
};

SubtaskManager.propTypes = {
  subtasks: PropTypes.array.isRequired,
  onSubtaskUpdate: PropTypes.func.isRequired
};

export default SubtaskManager;