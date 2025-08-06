import { VALIDATION_RULES } from './constants'

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}

export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  if (!VALIDATION_RULES.EMAIL.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long`
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number'
  }
  return null
}

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return null
}

export const validateName = (name, fieldName = 'Name') => {
  if (!name) return `${fieldName} is required`
  if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return `${fieldName} must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long`
  }
  return null
}

export const validateCompanyName = (name) => {
  if (!name) return 'Company name is required'
  if (name.trim().length < VALIDATION_RULES.COMPANY_NAME_MIN_LENGTH) {
    return `Company name must be at least ${VALIDATION_RULES.COMPANY_NAME_MIN_LENGTH} characters long`
  }
  return null
}

export const validateTaskTitle = (title) => {
  if (!title) return 'Task title is required'
  if (title.trim().length < 3) {
    return 'Task title must be at least 3 characters long'
  }
  if (title.length > 100) {
    return 'Task title must be less than 100 characters'
  }
  return null
}

export const validateTaskDescription = (description) => {
  if (!description) return 'Task description is required'
  if (description.trim().length < 10) {
    return 'Task description must be at least 10 characters long'
  }
  if (description.length > 1000) {
    return 'Task description must be less than 1000 characters'
  }
  return null
}

export const validateDueDate = (dueDate) => {
  if (!dueDate) return 'Due date is required'
  const date = new Date(dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (date < today) {
    return 'Due date cannot be in the past'
  }
  return null
}

export const validateAssignee = (assignee) => {
  if (!assignee) return 'Please select an assignee'
  return null
}

export const validatePriority = (priority) => {
  const validPriorities = ['high', 'medium', 'low']
  if (!priority) return 'Please select a priority'
  if (!validPriorities.includes(priority)) {
    return 'Please select a valid priority'
  }
  return null
}

export const validateFileUpload = (file) => {
  if (!file) return null
  
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt']
  
  if (file.size > maxSize) {
    return 'File size must be less than 10MB'
  }
  
  const fileExtension = file.name.split('.').pop().toLowerCase()
  if (!allowedTypes.includes(fileExtension)) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
  }
  
  return null
}

export const validateForm = (data, rules) => {
  const errors = {}
  
  for (const field in rules) {
    const value = data[field]
    const fieldRules = rules[field]
    
    for (const rule of fieldRules) {
      const error = rule(value)
      if (error) {
        errors[field] = error
        break
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const createValidationSchema = (fields) => {
  const schema = {}
  
  fields.forEach(field => {
    const { name, required, type, minLength, maxLength, pattern } = field
    const rules = []
    
    if (required) {
      rules.push((value) => validateRequired(value, name))
    }
    
    if (type === 'email') {
      rules.push(validateEmail)
    }
    
    if (type === 'password') {
      rules.push(validatePassword)
    }
    
    if (minLength) {
      rules.push((value) => {
        if (value && value.length < minLength) {
          return `${name} must be at least ${minLength} characters long`
        }
        return null
      })
    }
    
    if (maxLength) {
      rules.push((value) => {
        if (value && value.length > maxLength) {
          return `${name} must be less than ${maxLength} characters long`
        }
        return null
      })
    }
    
    if (pattern) {
      rules.push((value) => {
        if (value && !pattern.test(value)) {
          return `${name} format is invalid`
        }
        return null
      })
    }
    
    schema[field.name] = rules
  })
  
  return schema
}