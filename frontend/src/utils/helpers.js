import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns'
import { TASK_PRIORITIES, TASK_STATUS, DATE_FORMATS } from './constants'

export const formatDate = (date, formatType = DATE_FORMATS.MEDIUM) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatType)
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'HH:mm')}`
  }
  
  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'HH:mm')}`
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export const getPriorityColor = (priority) => {
  const colors = {
    [TASK_PRIORITIES.HIGH]: 'text-red-600 bg-red-100 border-red-200',
    [TASK_PRIORITIES.MEDIUM]: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    [TASK_PRIORITIES.LOW]: 'text-green-600 bg-green-100 border-green-200'
  }
  return colors[priority] || colors[TASK_PRIORITIES.MEDIUM]
}

export const getStatusColor = (status) => {
  const colors = {
    [TASK_STATUS.AWAITING_ACCEPTANCE]: 'text-blue-600 bg-blue-100 border-blue-200',
    [TASK_STATUS.IN_PROGRESS]: 'text-purple-600 bg-purple-100 border-purple-200',
    [TASK_STATUS.COMPLETED]: 'text-green-600 bg-green-100 border-green-200',
    [TASK_STATUS.REJECTED]: 'text-red-600 bg-red-100 border-red-200'
  }
  return colors[status] || colors[TASK_STATUS.AWAITING_ACCEPTANCE]
}

export const getPriorityLabel = (priority) => {
  const labels = {
    [TASK_PRIORITIES.HIGH]: 'High Priority',
    [TASK_PRIORITIES.MEDIUM]: 'Medium Priority',
    [TASK_PRIORITIES.LOW]: 'Low Priority'
  }
  return labels[priority] || 'Medium Priority'
}

export const getStatusLabel = (status) => {
  const labels = {
    [TASK_STATUS.AWAITING_ACCEPTANCE]: 'Awaiting Acceptance',
    [TASK_STATUS.IN_PROGRESS]: 'In Progress',
    [TASK_STATUS.COMPLETED]: 'Completed',
    [TASK_STATUS.REJECTED]: 'Rejected'
  }
  return labels[status] || 'Awaiting Acceptance'
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const generateInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: password.length < minLength,
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumbers: !hasNumbers,
      hasSpecialChar: !hasSpecialChar
    }
  }
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export const sortByDate = (array, dateField, order = 'desc') => {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateField])
    const dateB = new Date(b[dateField])
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
}

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {})
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phoneNumber
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      return true
    } catch (err) {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}