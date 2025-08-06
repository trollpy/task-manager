import { useState } from 'react';
import Modal from '../ui/Modal';
import TaskForm from './TaskForm';
import Button from '../ui/Button';

const TaskDetails = ({ task, users, onUpdate, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="mt-1">{task.description || 'No description provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="mt-1 capitalize">{task.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <p className="mt-1 capitalize">{task.priority}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="mt-1">{task.dueDate || 'No due date set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Assignee</p>
              <p className="mt-1">{task.assignee || 'Unassigned'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="mt-1">{task.createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
      >
        <TaskForm
          onSubmit={(updatedTask) => {
            onUpdate(updatedTask);
            setIsEditModalOpen(false);
          }}
          initialValues={task}
          users={users}
        />
      </Modal>
    </div>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskDetails;