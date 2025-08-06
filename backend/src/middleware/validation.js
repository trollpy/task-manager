import { body, validationResult } from 'express-validator';

// Reusable middleware to handle validation result
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware for validating user registration
export const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('organizationName').trim().notEmpty(),
  handleValidationErrors
];

// Middleware for validating user login
export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidationErrors
];

// Middleware for validating user update
export const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('role').isIn(['Admin', 'Manager', 'Team Member']),
  handleValidationErrors
];

// Middleware for validating task creation/update
export const validateTask = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('assignee').isMongoId(),
  body('priority').isIn(['Low', 'Medium', 'High']),
  body('dueDate').isISO8601(),
  handleValidationErrors
];
