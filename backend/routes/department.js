// routes/department.js
const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/DepartmentController');

router.post('/', DepartmentController.createDepartment);
router.get('/', DepartmentController.getDepartments);
router.put('/:id', DepartmentController.updateDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);

module.exports = router;
