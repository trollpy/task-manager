import Organization from '../models/Organization.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';

export const getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.user.organization);

    if (!organization) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrganization = async (req, res, next) => {
  try {
    // Only admins can update organization
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.user.organization,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    // Log the action
    await AuditLog.create({
      action: 'Update Organization',
      entity: 'Organization',
      entityId: organization._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: 'Updated organization details'
    });

    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (err) {
    next(err);
  }
};

export const uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No logo file uploaded' });
    }

    // Only admins can upload logo
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.user.organization,
      { logo: req.file.path },
      { new: true, runValidators: true }
    );

    // Log the action
    await AuditLog.create({
      action: 'Upload Logo',
      entity: 'Organization',
      entityId: organization._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: 'Updated organization logo'
    });

    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (err) {
    next(err);
  }
};

export const getOrganizationMembers = async (req, res, next) => {
  try {
    const users = await User.find({ organization: req.user.organization })
      .select('-password')
      .sort('name');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

export const getOrganizationStats = async (req, res, next) => {
  try {
    const totalMembers = await User.countDocuments({ organization: req.user.organization });
    const totalTasks = await Task.countDocuments({ organization: req.user.organization });
    const completedTasks = await Task.countDocuments({ 
      organization: req.user.organization,
      status: 'Completed'
    });

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        totalTasks,
        completedTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
      }
    });
  } catch (err) {
    next(err);
  }
};