const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Create doctor profile
router.post('/', authMiddleware, (req, res, next) => {
    console.log('Route hit: POST /doctors');
    console.log('Request headers:', req.headers);
    next();
  }, DoctorController.createDoctor);
// Get doctor profile
router.get('/:id', authMiddleware, DoctorController.getDoctor);

// Update doctor profile
router.put('/:id', authMiddleware, DoctorController.updateDoctor);

// Search doctors
router.get('/', authMiddleware, DoctorController.searchDoctors);

// Delete doctor
router.delete('/:id', authMiddleware, DoctorController.deleteDoctor);

module.exports = router; 