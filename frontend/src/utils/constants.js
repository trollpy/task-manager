export const TASK_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

export const TASK_STATUS = {
  AWAITING_ACCEPTANCE: 'awaiting_acceptance',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
}

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TEAM_MEMBER: 'team_member'
}

export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  TASK_UPDATED: 'task_updated',
  TASK_COMPLETED: 'task_completed',
  TASK_OVERDUE: 'task_overdue',
  DEADLINE_REMINDER: 'deadline_reminder'
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile'
  },
  TASKS: {
    BASE: '/api/tasks',
    CREATE: '/api/tasks',
    UPDATE: '/api/tasks',
    DELETE: '/api/tasks',
    ASSIGN: '/api/tasks/assign',
    ACCEPT: '/api/tasks/accept',
    REJECT: '/api/tasks/reject'
  },
  USERS: {
    BASE: '/api/users',
    CREATE: '/api/users',
    UPDATE: '/api/users',
    DELETE: '/api/users'
  },
  ORGANIZATIONS: {
    BASE: '/api/organizations',
    UPDATE: '/api/organizations'
  },
  REPORTS: {
    BASE: '/api/reports',
    PERFORMANCE: '/api/reports/performance',
    ANALYTICS: '/api/reports/analytics',
    EXPORT: '/api/reports/export'
  },
  AI: {
    SUGGESTIONS: '/api/ai/suggestions',
    INSIGHTS: '/api/ai/insights',
    REPORTS: '/api/ai/reports'
  }
}

export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#6366f1',
  SECONDARY: '#6b7280'
}

export const DATE_FORMATS = {
  SHORT: 'MMM dd',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy HH:mm'
}

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
}

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  COMPANY_NAME_MIN_LENGTH: 2
}

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt'],
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
}

export const SOCKET_EVENTS = {
  TASK_CREATED: 'task_created',
  TASK_UPDATED: 'task_updated',
  TASK_DELETED: 'task_deleted',
  NOTIFICATION: 'notification',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline'
}

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
}

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
}