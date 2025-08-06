const SOCKET_EVENTS = {
  // Connection events
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  
  // Authentication events
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  
  // Notification events
  NOTIFICATION_READ: 'notification_read',
  NOTIFICATION_UPDATED: 'notification_updated',
  INITIAL_NOTIFICATIONS: 'initial_notifications',
  NEW_NOTIFICATION: 'new_notification',
  
  // Task events
  TASK_ASSIGNED: 'task_assigned',
  TASK_UPDATED: 'task_updated',
  TASK_STATUS_CHANGED: 'task_status_changed',
  TASK_UPDATE: 'task_update',
  TASK_COMMENT_ADDED: 'task_comment_added',
  
  // Typing events
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  USER_STOP_TYPING: 'user_stop_typing',
  
  // User events
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  USER_STATUS_CHANGED: 'user_status_changed',
  
  // Organization events
  ORGANIZATION_UPDATED: 'organization_updated',
  TEAM_MEMBER_ADDED: 'team_member_added',
  TEAM_MEMBER_REMOVED: 'team_member_removed',
  
  // System events
  SERVER_MESSAGE: 'server_message',
  MAINTENANCE_MODE: 'maintenance_mode',
  ERROR: 'error'
};

const SOCKET_ROOMS = {
  ORGANIZATION: (orgId) => `org_${orgId}`,
  TASK: (taskId) => `task_${taskId}`,
  USER: (userId) => `user_${userId}`
};

module.exports = {
  SOCKET_EVENTS,
  SOCKET_ROOMS
};