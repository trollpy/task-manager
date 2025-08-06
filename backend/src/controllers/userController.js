import User from '../models/User.js';
import Organization from '../models/Organization.js';
import AuditLog from '../models/AuditLog.js';

export const getUsers = async (req, res, next) => {
  try {
    // Only fetch users from the same organization
    const users = await User.find({ organization: req.user.organization })
      .select('-password')
      .populate('organization');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('organization');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify user belongs to the same organization
    if (user.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    // Add organization to the request body
    req.body.organization = req.user.organization;

    const user = await User.create(req.body);

    // Log the action
    await AuditLog.create({
      action: 'Create User',
      entity: 'User',
      entityId: user._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Created user ${user.email}`
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify user belongs to the same organization
    if (user.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Prevent changing organization
    if (req.body.organization && req.body.organization !== user.organization.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot change organization' });
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    // Log the action
    await AuditLog.create({
      action: 'Update User',
      entity: 'User',
      entityId: user._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Updated user ${user.email}`
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify user belongs to the same organization
    if (user.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
    }

    await user.deleteOne();

    // Log the action
    await AuditLog.create({
      action: 'Delete User',
      entity: 'User',
      entityId: user._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Deleted user ${user.email}`
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    // Only admins can change roles
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to change roles' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify user belongs to the same organization
    if (user.organization.toString() !== req.user.organization.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Prevent changing your own role
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot change your own role' });
    }

    user.role = role;
    await user.save();

    // Log the action
    await AuditLog.create({
      action: 'Update Role',
      entity: 'User',
      entityId: user._id,
      performedBy: req.user.id,
      organization: req.user.organization,
      details: `Changed role to ${role} for user ${user.email}`
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};
