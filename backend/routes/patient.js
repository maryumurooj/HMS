const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const PatientValidator = require('../validators/PatientValidator');
const authMiddleware = require('../middleware/authMiddleware');

// Wrap static methods to ensure proper context
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create Patient Profile Route
router.post(
  '/profile', 
  authMiddleware,
  PatientValidator.validateCreateProfile, 
  asyncHandler(PatientController.createProfile)
);

// Get Patient Profile Route
router.get(
  '/profile', 
  authMiddleware, 
  asyncHandler(PatientController.getProfile)
);

// Update Patient Profile Route
router.put(
  '/profile', 
  authMiddleware,
  PatientValidator.validateUpdateProfile, 
  asyncHandler(PatientController.updateProfile)
);

// Search Patients Route (Admin only)
router.get(
  '/search', 
  authMiddleware,
  asyncHandler(PatientController.searchPatients)
);

module.exports = router;