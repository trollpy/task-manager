import { 
  format, 
  formatDistanceToNow, 
  isToday, 
  isYesterday, 
  isTomorrow,
  parseISO, 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes
} from 'date-fns'

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, formatStr)
}

export const formatDateTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'MMM dd, yyyy HH:mm')
}

export const formatTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'HH:mm')
}

export const getRelativeTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  
  if (isToday(parsedDate)) {
    return 'Today'
  }
  
  if (isYesterday(parsedDate)) {
    return 'Yesterday'
  }
  
  if (isTomorrow(parsedDate)) {
    return 'Tomorrow'
  }
  
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export const getDetailedRelativeTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  const now = new Date()
  
  const diffMinutes = differenceInMinutes(now, parsedDate)
  const diffHours = differenceInHours(now, parsedDate)
  const diffDays = differenceInDays(now, parsedDate)
  
  if (Math.abs(diffMinutes) < 1) {
    return 'Just now'
  }
  
  if (Math.abs(diffMinutes) < 60) {
    return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) === 1 ? '' : 's'} ${diffMinutes > 0 ? 'ago' : 'from now'}`
  }
  
  if (Math.abs(diffHours) < 24) {
    return `${Math.abs(diffHours)} hour${Math.abs(diffHours) === 1 ? '' : 's'} ${diffHours > 0 ? 'ago' : 'from now'}`
  }
  
  if (Math.abs(diffDays) < 7) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ${diffDays > 0 ? 'ago' : 'from now'}`
  }
  
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  return parsedDate < new Date()
}

export const isDueSoon = (dueDate, days = 3) => {
  if (!dueDate) return false
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  const warningDate = addDays(new Date(), days)
  return parsedDate <= warningDate && parsedDate >= new Date()
}

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  return differenceInDays(parsedDate, new Date())
}

export const getDateRanges = () => {
  const now = new Date()
  
  return {
    today: {
      start: startOfDay(now),
      end: endOfDay(now)
    },
    yesterday: {
      start: startOfDay(subDays(now, 1)),
      end: endOfDay(subDays(now, 1))
    },
    thisWeek: {
      start: startOfWeek(now),
      end: endOfWeek(now)
    },
    thisMonth: {
      start: startOfMonth(now),
      end: endOfMonth(now)
    },
    last7Days: {
      start: startOfDay(subDays(now, 7)),
      end: endOfDay(now)
    },
    last30Days: {
      start: startOfDay(subDays(now, 30)),
      end: endOfDay(now)
    }
  }
}

export const formatDateForInput = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'yyyy-MM-dd')
}

export const formatDateTimeForInput = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm")
}

export const createDateFromInput = (dateString) => {
  if (!dateString) return null
  return parseISO(dateString)
}

export const getWeekDays = () => {
  const days = []
  const startDate = startOfWeek(new Date())
  
  for (let i = 0; i < 7; i++) {
    days.push(addDays(startDate, i))
  }
  
  return days
}

export const getMonthDays = (date = new Date()) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = []
  
  let current = start
  while (current <= end) {
    days.push(current)
    current = addDays(current, 1)
  }
  
  return days
}

export const getTimeSlots = (startHour = 9, endHour = 17, interval = 30) => {
  const slots = []
  const start = new Date()
  start.setHours(startHour, 0, 0, 0)
  
  const end = new Date()
  end.setHours(endHour, 0, 0, 0)
  
  let current = start
  while (current <= end) {
    slots.push({
      value: format(current, 'HH:mm'),
      label: format(current, 'h:mm a')
    })
    current = new Date(current.getTime() + interval * 60000)
  }
  
  return slots
}

export const groupDatesByMonth = (dates) => {
  const groups = {}
  
  dates.forEach(date => {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    const monthKey = format(parsedDate, 'yyyy-MM')
    const monthLabel = format(parsedDate, 'MMMM yyyy')
    
    if (!groups[monthKey]) {
      groups[monthKey] = {
        label: monthLabel,
        dates: []
      }
    }
    
    groups[monthKey].dates.push(date)
  })
  
  return groups
}

export const getBusinessDays = (startDate, endDate) => {
  const days = []
  let current = startDate
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      days.push(current)
    }
    current = addDays(current, 1)
  }
  
  return days
}