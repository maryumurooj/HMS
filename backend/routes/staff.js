const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/StaffController');
const authMiddleware = require('../middleware/authMiddleware');

// Staff Routes
router.post('/', authMiddleware, StaffController.createStaff);
router.get('/', authMiddleware, StaffController.getStaff);
router.put('/:id', authMiddleware, StaffController.updateStaff);

module.exports = router;
