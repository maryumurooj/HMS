// routes/department.js
const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/DepartmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply auth middleware to all routes
router.use(authMiddleware);

// CRUD routes
router.post("/", DepartmentController.createDepartment);
router.get("/", DepartmentController.getDepartments);
router.get("/:id", DepartmentController.getDepartment);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

module.exports = router;
