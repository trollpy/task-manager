import Task from '../models/Task.js';
import User from '../models/User.js';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReportService {
  async generateDashboardStats(organizationId) {
    const tasks = await Task.find({ organization: organizationId }).populate('assignee');
    const users = await User.find({ organization: organizationId, role: { $ne: 'Admin' } });

    const stats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'Completed').length,
      inProgressTasks: tasks.filter(t => t.status === 'In Progress').length,
      pendingTasks: tasks.filter(t => t.status === 'Awaiting Acceptance').length,
      overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
      totalUsers: users.length,
      tasksByPriority: {
        high: tasks.filter(t => t.priority === 'High').length,
        medium: tasks.filter(t => t.priority === 'Medium').length,
        low: tasks.filter(t => t.priority === 'Low').length
      },
      recentTasks: tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
    };

    return stats;
  }

  async generatePerformanceReport(organizationId, dateRange = {}) {
    const { startDate, endDate } = dateRange;
    const query = { organization: organizationId };
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const tasks = await Task.find(query).populate('assignee');
    const users = await User.find({ organization: organizationId, role: { $ne: 'Admin' } });

    const userPerformance = users.map(user => {
      const userTasks = tasks.filter(t => t.assignee && t.assignee._id.toString() === user._id.toString());
      const completedTasks = userTasks.filter(t => t.status === 'Completed');
      const onTimeTasks = completedTasks.filter(t => new Date(t.completedAt) <= new Date(t.dueDate));

      return {
        user: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role
        },
        stats: {
          totalAssigned: userTasks.length,
          completed: completedTasks.length,
          inProgress: userTasks.filter(t => t.status === 'In Progress').length,
          pending: userTasks.filter(t => t.status === 'Awaiting Acceptance').length,
          completionRate: userTasks.length > 0 ? (completedTasks.length / userTasks.length * 100).toFixed(1) : 0,
          onTimeRate: completedTasks.length > 0 ? (onTimeTasks.length / completedTasks.length * 100).toFixed(1) : 0,
          avgCompletionDays: this.calculateAvgCompletionDays(completedTasks)
        }
      };
    });

    return {
      summary: {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'Completed').length,
        overallCompletionRate: tasks.length > 0 ? (tasks.filter(t => t.status === 'Completed').length / tasks.length * 100).toFixed(1) : 0,
        avgCompletionTime: this.calculateAvgCompletionDays(tasks.filter(t => t.status === 'Completed'))
      },
      userPerformance,
      dateRange: { startDate, endDate }
    };
  }

  async exportToPDF(reportData, reportType) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const filename = `${reportType}_report_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '../../uploads/reports/', filename);

        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        doc.pipe(fs.createWriteStream(filePath));

        // Header
        doc.fontSize(20).text(`${reportType.toUpperCase()} Report`, { align: 'center' });
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown();

        if (reportType === 'performance') {
          // Summary section
          doc.fontSize(16).text('Summary');
          doc.fontSize(12)
             .text(`Total Tasks: ${reportData.summary.totalTasks}`)
             .text(`Completed Tasks: ${reportData.summary.completedTasks}`)
             .text(`Completion Rate: ${reportData.summary.overallCompletionRate}%`)
             .text(`Average Completion Time: ${reportData.summary.avgCompletionTime} days`);
          
          doc.moveDown();

          // User performance
          doc.fontSize(16).text('User Performance');
          reportData.userPerformance.forEach(user => {
            doc.fontSize(14).text(user.user.name);
            doc.fontSize(10)
               .text(`  Role: ${user.user.role}`)
               .text(`  Total Assigned: ${user.stats.totalAssigned}`)
               .text(`  Completed: ${user.stats.completed}`)
               .text(`  Completion Rate: ${user.stats.completionRate}%`)
               .text(`  On-time Rate: ${user.stats.onTimeRate}%`);
            doc.moveDown(0.5);
          });
        }

        doc.end();

        doc.on('end', () => {
          resolve({ filename, filePath });
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  async exportToExcel(reportData, reportType) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    if (reportType === 'performance') {
      // Headers
      worksheet.columns = [
        { header: 'User Name', key: 'name', width: 20 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Total Assigned', key: 'totalAssigned', width: 15 },
        { header: 'Completed', key: 'completed', width: 12 },
        { header: 'In Progress', key: 'inProgress', width: 12 },
        { header: 'Completion Rate (%)', key: 'completionRate', width: 18 },
        { header: 'On-time Rate (%)', key: 'onTimeRate', width: 16 }
      ];

      // Data rows
      reportData.userPerformance.forEach(user => {
        worksheet.addRow({
          name: user.user.name,
          role: user.user.role,
          totalAssigned: user.stats.totalAssigned,
          completed: user.stats.completed,
          inProgress: user.stats.inProgress,
          completionRate: user.stats.completionRate,
          onTimeRate: user.stats.onTimeRate
        });
      });

      // Style headers
      worksheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };
      });
    }

    const filename = `${reportType}_report_${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, '../../uploads/reports/', filename);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);
    return { filename, filePath };
  }

  calculateAvgCompletionDays(tasks) {
    if (tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(t => t.completedAt);
    if (completedTasks.length === 0) return 0;

    const totalDays = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt);
      const completed = new Date(task.completedAt);
      const days = (completed - created) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0);

    return (totalDays / completedTasks.length).toFixed(1);
  }
}

export const reportService = new ReportService();
export const { generatePerformanceReport, generateDashboardStats, exportToPDF, exportToExcel } = reportService;
export default reportService;