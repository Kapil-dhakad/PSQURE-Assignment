// middlewares/validateUser.js
import { body, validationResult } from 'express-validator';

// Registration validation
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Valid email required')
    .isLength({ max: 100 }).withMessage('Email max 100 chars'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password min 8 chars')
    .matches(/[A-Z]/).withMessage('Password must contain 1 uppercase letter')
    .matches(/\d/).withMessage('Password must contain 1 number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Don't expose stack or sensitive info
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Login validation
export const validateLogin = [
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Valid email required'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];
