import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../ui/Card';

const statusColumns = {
  'pending': 'Pending',
  'inProgress': 'In Progress',
  'completed': 'Completed'
};

const KanbanBoard = ({ tasks, onTaskUpdate }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    const newStatus = destination.droppableId;
    onTaskUpdate(draggableId, { status: statusColumns[newStatus] });
  };

  const tasksByStatus = {
    pending: tasks.filter(task => task.status === 'Pending'),
    inProgress: tasks.filter(task => task.status === 'In Progress'),
    completed: tasks.filter(task => task.status === 'Completed')
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusColumns).map(([key, status]) => (
          <div key={key} className="space-y-3">
            <h3 className="font-medium text-gray-700">{status}</h3>
            <Droppable droppableId={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 rounded-lg p-3 min-h-[200px]"
                >
                  {tasksByStatus[key].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <Card className="p-3">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
                              <span className="text-xs text-gray-400">{task.assignee}</span>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

KanbanBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired
};

export default KanbanBoard;