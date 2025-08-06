const permissions = {
  Admin: [
    'user:create', 'user:read', 'user:update', 'user:delete',
    'task:create', 'task:read', 'task:update', 'task:delete',
    'organization:read', 'organization:update',
    'report:read', 'report:export'
  ],
  Manager: [
    'user:read',
    'task:create', 'task:read', 'task:update', 'task:delete',
    'report:read', 'report:export'
  ],
  'Team Member': [
    'task:read', 'task:update'
  ]
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    const userPermissions = permissions[req.user.role] || [];
    
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

module.exports = { checkPermission, permissions };