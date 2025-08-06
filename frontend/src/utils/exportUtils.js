import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { formatDate, formatDateTime } from './dateUtils'
import { getPriorityLabel, getStatusLabel } from './helpers'

export const exportToPDF = async (elementId, filename = 'report.pdf') => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)
    return true
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    return false
  }
}

export const exportTasksToPDF = (tasks, title = 'Tasks Report') => {
  try {
    const pdf = new jsPDF()
    const pageHeight = pdf.internal.pageSize.height
    let y = 20

    // Title
    pdf.setFontSize(20)
    pdf.text(title, 20, y)
    y += 20

    // Date
    pdf.setFontSize(12)
    pdf.text(`Generated on: ${formatDateTime(new Date())}`, 20, y)
    y += 20

    // Table headers
    pdf.setFontSize(10)
    pdf.text('Title', 20, y)
    pdf.text('Assignee', 70, y)
    pdf.text('Priority', 120, y)
    pdf.text('Status', 150, y)
    pdf.text('Due Date', 180, y)
    y += 10

    // Line under headers
    pdf.line(20, y - 5, 200, y - 5)

    // Task data
    tasks.forEach((task, index) => {
      if (y > pageHeight - 30) {
        pdf.addPage()
        y = 20
      }

      const title = task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title
      const assignee = task.assignee?.name || 'Unassigned'
      const priority = getPriorityLabel(task.priority)
      const status = getStatusLabel(task.status)
      const dueDate = task.dueDate ? formatDate(task.dueDate) : 'No due date'

      pdf.text(title, 20, y)
      pdf.text(assignee, 70, y)
      pdf.text(priority, 120, y)
      pdf.text(status, 150, y)
      pdf.text(dueDate, 180, y)
      y += 8
    })

    pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    return true
  } catch (error) {
    console.error('Error exporting tasks to PDF:', error)
    return false
  }
}

export const exportToCSV = (data, filename = 'export.csv', headers = null) => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export')
    }

    let csvContent = ''
    
    // Add headers
    if (headers) {
      csvContent += headers.join(',') + '\n'
    } else {
      // Use object keys as headers
      csvContent += Object.keys(data[0]).join(',') + '\n'
    }

    // Add data rows
    data.forEach(row => {
      const values = headers 
        ? headers.map(header => {
            let value = row[header] || ''
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              value = `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
        : Object.values(row).map(value => {
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              value = `"${value.replace(/"/g, '""')}"`
            }
            return value || ''
          })
      
      csvContent += values.join(',') + '\n'
    })

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return true
  } catch (error) {
    console.error('Error exporting to CSV:', error)
    return false
  }
}

export const exportTasksToCSV = (tasks, filename = 'tasks-export.csv') => {
  const headers = [
    'title',
    'description',
    'assignee',
    'priority',
    'status',
    'dueDate',
    'createdAt',
    'completedAt'
  ]

  const formattedTasks = tasks.map(task => ({
    title: task.title,
    description: task.description,
    assignee: task.assignee?.name || 'Unassigned',
    priority: getPriorityLabel(task.priority),
    status: getStatusLabel(task.status),
    dueDate: task.dueDate ? formatDate(task.dueDate) : '',
    createdAt: formatDateTime(task.createdAt),
    completedAt: task.completedAt ? formatDateTime(task.completedAt) : ''
  }))

  return exportToCSV(formattedTasks, filename, [
    'Title',
    'Description',
    'Assignee',
    'Priority',
    'Status',
    'Due Date',
    'Created At',
    'Completed At'
  ])
}

export const exportReportToCSV = (reportData, reportType, filename) => {
  try {
    let data = []
    let headers = []

    switch (reportType) {
      case 'performance':
        headers = ['User', 'Tasks Assigned', 'Tasks Completed', 'Completion Rate', 'Average Days to Complete']
        data = reportData.users.map(user => ({
          'User': user.name,
          'Tasks Assigned': user.tasksAssigned,
          'Tasks Completed': user.tasksCompleted,
          'Completion Rate': `${user.completionRate}%`,
          'Average Days to Complete': user.avgDaysToComplete
        }))
        break

      case 'tasks-by-priority':
        headers = ['Priority', 'Count', 'Percentage']
        data = reportData.map(item => ({
          'Priority': getPriorityLabel(item.priority),
          'Count': item.count,
          'Percentage': `${item.percentage}%`
        }))
        break

      case 'tasks-by-status':
        headers = ['Status', 'Count', 'Percentage']
        data = reportData.map(item => ({
          'Status': getStatusLabel(item.status),
          'Count': item.count,
          'Percentage': `${item.percentage}%`
        }))
        break

      default:
        throw new Error('Unknown report type')
    }

    return exportToCSV(data, filename, headers)
  } catch (error) {
    console.error('Error exporting report to CSV:', error)
    return false
  }
}

export const exportUsersToCSV = (users, filename = 'users-export.csv') => {
  const headers = [
    'name',
    'email',
    'role',
    'tasksAssigned',
    'tasksCompleted',
    'joinedAt'
  ]

  const formattedUsers = users.map(user => ({
    name: user.name,
    email: user.email,
    role: user.role,
    tasksAssigned: user.tasksAssigned || 0,
    tasksCompleted: user.tasksCompleted || 0,
    joinedAt: formatDate(user.createdAt)
  }))

  return exportToCSV(formattedUsers, filename, [
    'Name',
    'Email',
    'Role',
    'Tasks Assigned',
    'Tasks Completed',
    'Joined At'
  ])
}

export const createPrintableReport = (reportData, title) => {
  const printWindow = window.open('', '_blank')
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .date { color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .summary { margin: 20px 0; padding: 15px; background-color: #f0f8ff; border-radius: 5px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${title}</div>
          <div class="date">Generated on ${formatDateTime(new Date())}</div>
        </div>
        <div id="report-content">
          ${JSON.stringify(reportData, null, 2)}
        </div>
        <button class="no-print" onclick="window.print()">Print Report</button>
      </body>
    </html>
  `
  
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}