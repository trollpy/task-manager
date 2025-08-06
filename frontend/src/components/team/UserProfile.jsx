import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => {
  const roleColors = {
    'Admin': 'red',
    'Manager': 'blue',
    'Member': 'green'
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <Badge variant={roleColors[user.role]} size="lg">
              {user.role}
            </Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p>{user.department || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Join Date</p>
              <p>{user.joinDate || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned Tasks</p>
              <p>{user.assignedTasks || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <p>{user.completedTasks || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserProfile;