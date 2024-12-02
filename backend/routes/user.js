const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');
const authMiddleware = require('../middleware/authMiddleware');

// Wrap static methods to ensure proper context
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// User Registration Route
router.post(
  '/register', 
  UserValidator.validateRegistration, 
  asyncHandler(UserController.register)
);

// User Login Route
router.post(
  '/login', 
  UserValidator.validateLogin, 
  asyncHandler(UserController.login)
);

// Get User Profile Route (Protected)
router.get(
  '/profile', 
  authMiddleware, 
  asyncHandler(UserController.getProfile)
);

module.exports = router;