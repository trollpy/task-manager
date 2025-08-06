import Task from '../models/Task.js';
import User from '../models/User.js';
import { analyzeTask, generateInsights } from '../services/aiService.js';

export const suggestAssignee = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    // Get all users in the organization
    const users = await User.find({ organization: req.user.organization })
      .select('name email role skills')
      .lean();

    // Get similar tasks
    const similarTasks = await Task.find({
      organization: req.user.organization,
      $or: [
        { title: { $regex: title, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } }
      ]
    })
      .populate('assignee', 'name')
      .limit(5)
      .lean();

    // Analyze task and get recommendations
    const recommendations = await analyzeTask({
      title,
      description,
      priority,
      users,
      similarTasks
    });

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (err) {
    next(err);
  }
};

export const getInsights = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Get tasks and users for the period
    const tasks = await Task.find({
      organization: req.user.organization,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).lean();

    const users = await User.find({ organization: req.user.organization })
      .select('name role')
      .lean();

    // Generate AI insights
    const insights = await generateInsights(tasks, users);

    res.status(200).json({
      success: true,
      data: insights
    });
  } catch (err) {
    next(err);
  }
};

export const generateSummary = async (req, res, next) => {
  try {
    const { reportData } = req.body;

    // Generate AI summary (would integrate with AI service)
    const summary = {
      keyPoints: [
        'Team completed 85% of assigned tasks this month',
        'High priority tasks had a 92% completion rate',
        'Task completion rates were highest on Wednesdays'
      ],
      recommendations: [
        'Consider redistributing tasks from overloaded team members',
        'Provide additional training on time management',
        'Review workload balance across teams'
      ]
    };

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (err) {
    next(err);
  }
};

export const optimizeWorkload = async (req, res, next) => {
  try {
    // Get all tasks and users
    const tasks = await Task.find({
      organization: req.user.organization,
      status: { $ne: 'Completed' }
    }).lean();

    const users = await User.find({ organization: req.user.organization })
      .select('name role currentWorkload skills')
      .lean();

    // Generate optimized workload distribution (would integrate with AI service)
    const optimizedDistribution = users.map(user => ({
      userId: user._id,
      name: user.name,
      currentTasks: tasks.filter(t => t.assignee?.toString() === user._id.toString()).length,
      recommendedTasks: Math.floor(Math.random() * 5) // Placeholder
    }));

    res.status(200).json({
      success: true,
      data: optimizedDistribution
    });
  } catch (err) {
    next(err);
  }
};

// Legacy function names for backward compatibility
export const getTaskRecommendations = suggestAssignee;
export const getPerformanceInsights = getInsights;
export const generateReportSummary = generateSummary;