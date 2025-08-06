export const TASK_STATUS = {
  AWAITING_ACCEPTANCE: 'Awaiting Acceptance',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled'
};

export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

export const USER_ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  TEAM_MEMBER: 'Team Member'
};

export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  TASK_STATUS_UPDATE: 'task_status_update',
  TASK_REMINDER: 'task_reminder',
  TASK_OVERDUE: 'task_overdue'
};

export const FILE_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  SPREADSHEET: 'spreadsheet',
  ARCHIVE: 'archive'
};

export const AUDIT_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

export const EMAIL_TEMPLATES = {
  TASK_ASSIGNMENT: 'task_assignment',
  TASK_STATUS_UPDATE: 'task_status_update',
  TASK_REMINDER: 'task_reminder',
  WELCOME: 'welcome',
  PASSWORD_RESET: 'password_reset'
};

export const API_MESSAGES = {
  SUCCESS: {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FOUND: 'Resource found successfully'
  },
  ERROR: {
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Insufficient permissions',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error'
  }
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

export const DATE_FORMATS = {
  API: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DISPLAY: 'MMM DD, YYYY',
  FULL: 'MMMM DD, YYYY HH:mm A'
};
