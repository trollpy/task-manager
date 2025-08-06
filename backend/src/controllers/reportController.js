import Task from '../models/Task.js';
import User from '../models/User.js';
import { generatePerformanceReport } from '../services/reportService.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalTasks = await Task.countDocuments({ organization: req.user.organization });
    const completedTasks = await Task.countDocuments({ 
      organization: req.user.organization,
      status: 'Completed'
    });
    const pendingTasks = await Task.countDocuments({ 
      organization: req.user.organization,
      status: 'Pending'
    });
    const inProgressTasks = await Task.countDocuments({ 
      organization: req.user.organization,
      status: 'In Progress'
    });

    const totalUsers = await User.countDocuments({ organization: req.user.organization });

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        totalUsers,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getPerformanceReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const report = await generatePerformanceReport(
      req.user.organization,
      startDate,
      endDate
    );

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskAnalytics = async (req, res, next) => {
  try {
    const tasksByStatus = await Task.aggregate([
      {
        $match: { organization: req.user.organization }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const tasksByPriority = await Task.aggregate([
      {
        $match: { organization: req.user.organization }
      },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const tasksByAssignee = await Task.aggregate([
      {
        $match: { organization: req.user.organization }
      },
      {
        $group: {
          _id: '$assignee',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'assignee'
        }
      },
      {
        $unwind: '$assignee'
      },
      {
        $project: {
          'assignee.name': 1,
          'assignee.email': 1,
          count: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: tasksByStatus,
        byPriority: tasksByPriority,
        byAssignee: tasksByAssignee
      }
    });
  } catch (err) {
    next(err);
  }
};

export const exportReport = async (req, res, next) => {
  try {
    const { format, type } = req.query;

    let data;
    let filename;

    if (type === 'performance') {
      data = await generatePerformanceReport(req.user.organization);
      filename = 'performance-report';
    } else {
      // Default to task report
      data = await Task.find({ organization: req.user.organization })
        .populate('assignee', 'name email');
      filename = 'task-report';
    }

    // Set response headers based on format
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.csv`);
      // Convert data to CSV and send
      // (Implementation would go here)
    } else if (format === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
      // Generate PDF and send
      // (Implementation would go here)
    } else {
      // Default to JSON
      res.status(200).json({
        success: true,
        data
      });
    }
  } catch (err) {
    next(err);
  }
};

export const generateAISummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const report = await generatePerformanceReport(
      req.user.organization,
      startDate,
      endDate
    );

    // Generate AI summary (would integrate with AI service)
    const summary = {
      insights: [
        'Team is completing tasks 15% faster than last month',
        'High priority tasks have a 92% completion rate',
        'Wednesday is the most productive day of the week'
      ],
      recommendations: [
        'Consider redistributing tasks from overloaded team members',
        'Provide additional training on time management',
        'Review workload balance across teams'
      ]
    };

    res.status(200).json({
      success: true,
      data: {
        ...report,
        summary
      }
    });
  } catch (err) {
    next(err);
  }
};