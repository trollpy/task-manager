import Task from '../models/Task.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { sendNotification } from '../services/notificationService.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ organization: req.user.organization })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name')
      .populate('organization', 'name');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    req.body.organization = req.user.organization;
    req.body.createdBy = req.user.id;

    const task = await Task.create(req.body);
    const populatedTask = await Task.findById(task._id).populate('assignee', 'name email');

    if (populatedTask.assignee) {
      await sendNotification({
        userId: populatedTask.assignee._id,
        title: 'New Task Assigned',
        message: `You have been assigned a new task: ${task.title}`,
        type: 'task_assigned'
      });
    }

    await AuditLog.create({
      action: 'Create Task',
      entity: 'Task',
      entityId: task._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Created task "${task.title}"`
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const assigneeChanged = req.body.assignee && req.body.assignee !== task.assignee.toString();

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('assignee', 'name email');

    if (assigneeChanged && task.assignee) {
      await sendNotification({
        userId: task.assignee._id,
        title: 'Task Reassigned',
        message: `You have been assigned a task: ${task.title}`,
        type: 'task_assigned'
      });
    }

    await AuditLog.create({
      action: 'Update Task',
      entity: 'Task',
      entityId: task._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Updated task "${task.title}"`
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();

    await AuditLog.create({
      action: 'Delete Task',
      entity: 'Task',
      entityId: task._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Deleted task "${task.title}"`
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const assignTask = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const assignee = await User.findOne({
      _id: userId,
      organization: req.user.organization
    });

    if (!assignee) {
      return res.status(404).json({ success: false, message: 'User not found in organization' });
    }

    let task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    task.assignee = userId;
    task.status = 'Pending'; 
    task = await task.save();

    const populatedTask = await Task.findById(task._id).populate('assignee', 'name email');

    await sendNotification({
      userId: populatedTask.assignee._id,
      title: 'Task Assigned',
      message: `You have been assigned a task: ${task.title}`,
      type: 'task_assigned'
    });

    await AuditLog.create({
      action: 'Assign Task',
      entity: 'Task',
      entityId: task._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Assigned task "${task.title}" to ${assignee.name}`
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    let task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (task.assignee.toString() !== req.user.id && !['Admin', 'Manager'].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this task' 
      });
    }

    task.status = status;
    task = await task.save();

    if (task.createdBy.toString() !== req.user.id) {
      await sendNotification({
        userId: task.createdBy,
        title: 'Task Status Updated',
        message: `Task "${task.title}" status changed to ${status}`,
        type: 'task_updated'
      });
    }

    await AuditLog.create({
      action: 'Update Task Status',
      entity: 'Task',
      entityId: task._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Changed status to ${status} for task "${task.title}"`
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignee: req.user.id })
      .populate('createdBy', 'name')
      .populate('organization', 'name');

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// --- Missing route handlers required by your routes ---

export const acceptTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (task.assignee.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only assignee can accept the task' });
    }

    task.status = 'Accepted';
    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const rejectTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (task.assignee.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only assignee can reject the task' });
    }

    task.status = 'Rejected';
    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const uploadFiles = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    task.files = task.files || [];

    req.files.forEach(file => {
      task.files.push({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        uploadedAt: new Date()
      });
    });

    await task.save();

    res.status(200).json({ success: true, data: task.files });
  } catch (err) {
    next(err);
  }
};

export const getTaskFiles = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: task.files || [] });
  } catch (err) {
    next(err);
  }
};
