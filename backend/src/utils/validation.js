const { USER_ROLES, TASK_STATUS, TASK_PRIORITY } = require('./constants');

class ValidationUtils {
  // Email validation
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation
  validatePassword(password) {
    if (typeof password !== 'string') return false;
    if (password.length < 6) return false;
    if (password.length > 128) return false;
    
    // At least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return hasLetter && hasNumber;
  }

  // Name validation
  validateName(name) {
    if (typeof name !== 'string') return false;
    if (name.trim().length < 1) return false;
    if (name.length > 50) return false;
    
    // Only letters, spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name.trim());
  }

  // Organization name validation
  validateOrganizationName(name) {
    if (typeof name !== 'string') return false;
    if (name.trim().length < 2) return false;
    if (name.length > 100) return false;
    
    return true;
  }

  // Role validation
  validateRole(role) {
    return Object.values(USER_ROLES).includes(role);
  }

  // Task title validation
  validateTaskTitle(title) {
    if (typeof title !== 'string') return false;
    if (title.trim().length < 3) return false;
    if (title.length > 200) return false;
    
    return true;
  }

  // Task description validation
  validateTaskDescription(description) {
    if (typeof description !== 'string') return false;
    if (description.trim().length < 10) return false;
    if (description.length > 2000) return false;
    
    return true;
  }

  // Task status validation
  validateTaskStatus(status) {
    return Object.values(TASK_STATUS).includes(status);
  }

  // Task priority validation
  validateTaskPriority(priority) {
    return Object.values(TASK_PRIORITY).includes(priority);
  }

  // Date validation
  validateDate(date) {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }

  // Future date validation
  validateFutureDate(date) {
    const dateObj = new Date(date);
    const now = new Date();
    return this.validateDate(date) && dateObj > now;
  }

  // MongoDB ObjectId validation
  validateObjectId(id) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  }

  // Phone number validation (optional)
  validatePhoneNumber(phone) {
    if (!phone) return true; // Optional field
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // URL validation
  validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // File upload validation
  validateFileUpload(file, allowedTypes = [], maxSize = 10 * 1024 * 1024) {
    if (!file) return { valid: false, error: 'No file provided' };
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
      return { valid: false, error: 'Invalid file type' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File too large' };
    }
    
    return { valid: true };
  }

  // Sanitize input string
  sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
  }

 // Validate pagination parameters
  validatePagination(page, limit) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    
    return {
      page: Math.max(1, pageNum),
      limit: Math.min(100, Math.max(1, limitNum))
    };
  }

  // Validate sort parameters
  validateSort(sortBy, sortOrder) {
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'dueDate', 'priority', 'status'];
    const allowedSortOrders = ['asc', 'desc', 'ascending', 'descending', '1', '-1'];
    
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const validSortOrder = allowedSortOrders.includes(sortOrder) ? sortOrder : 'desc';
    
    return { sortBy: validSortBy, sortOrder: validSortOrder };
  }

  // Comprehensive task validation
  validateTaskData(taskData) {
    const errors = [];
    
    if (!this.validateTaskTitle(taskData.title)) {
      errors.push('Title must be between 3 and 200 characters');
    }
    
    if (!this.validateTaskDescription(taskData.description)) {
      errors.push('Description must be between 10 and 2000 characters');
    }
    
    if (!this.validateTaskPriority(taskData.priority)) {
      errors.push('Invalid priority level');
    }
    
    if (!this.validateDate(taskData.dueDate)) {
      errors.push('Invalid due date format');
    }
    
    if (taskData.assignee && !this.validateObjectId(taskData.assignee)) {
      errors.push('Invalid assignee ID');
    }
    
    return { valid: errors.length === 0, errors };
  }

  // Comprehensive user validation
  validateUserData(userData) {
    const errors = [];
    
    if (!this.validateName(userData.firstName)) {
      errors.push('First name must contain only letters and be 1-50 characters');
    }
    
    if (!this.validateName(userData.lastName)) {
      errors.push('Last name must contain only letters and be 1-50 characters');
    }
    
    if (!this.validateEmail(userData.email)) {
      errors.push('Invalid email format');
    }
    
    if (userData.password && !this.validatePassword(userData.password)) {
      errors.push('Password must be at least 6 characters with letters and numbers');
    }
    
    if (!this.validateRole(userData.role)) {
      errors.push('Invalid user role');
    }
    
    return { valid: errors.length === 0, errors };
  }
}

module.exports = new ValidationUtils();