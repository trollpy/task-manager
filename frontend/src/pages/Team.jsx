import { useState } from 'react';
import TeamList from '../components/team/TeamList';
import UserProfile from '../components/team/UserProfile';
import Modal from '../components/ui/Modal';
import UserForm from '../components/team/UserForm';

const Team = () => {
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      department: 'Engineering',
      assignedTasks: 12,
      completedTasks: 11
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Manager',
      department: 'Marketing',
      assignedTasks: 8,
      completedTasks: 7
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Member',
      department: 'Sales',
      assignedTasks: 5,
      completedTasks: 4
    }
  ]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (newMember) => {
    setMembers([...members, { ...newMember, id: Date.now().toString() }]);
  };

  const handleEditMember = (id, updates) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team</h1>
      {selectedMember ? (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedMember(null)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Team
          </button>
          <UserProfile user={selectedMember} />
        </div>
      ) : (
        <>
          <TeamList 
            members={members} 
            onEdit={(id) => {
              const member = members.find(m => m.id === id);
              setSelectedMember(member);
            }}
            onDelete={handleDeleteMember}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Team Member"
          >
            <UserForm 
              onSubmit={handleAddMember} 
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Team;