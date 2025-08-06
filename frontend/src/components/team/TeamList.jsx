import Card from '../ui/Card';
import Badge from '../ui/Badge';

const roleColors = {
  'Admin': 'red',
  'Manager': 'blue',
  'Member': 'green'
};

const TeamList = ({ members, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Button variant="primary">+ Add Member</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <Card key={member.id} className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Badge variant={roleColors[member.role]}>
                {member.role}
              </Badge>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEdit(member.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(member.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

TeamList.propTypes = {
  members: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TeamList;