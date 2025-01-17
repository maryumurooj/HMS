// controllers/DepartmentController.js
const Department = require("../models/Department");

class DepartmentController {
  static async createDepartment(req, res) {
    try {
      const departmentData = req.body;
      console.log("Received department data:", departmentData);

      // Map departmentName to name for the database
      const mappedData = {
        ...departmentData,
        name: departmentData.departmentName, // Map departmentName to name
      };

      // Validate required fields
      if (!mappedData.departmentCd || !mappedData.name) {
        console.log("Validation failed: Missing required fields");
        return res.status(400).json({
          success: false,
          message: "Department Code and Name are required",
        });
      }

      console.log("Creating department with data:", mappedData);
      const department = await Department.create(mappedData);
      console.log("Created department:", department.toJSON());

      res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: department,
      });
    } catch (error) {
      console.error("Department creation error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating department",
        error: error.message,
      });
    }
  }

  static async getDepartments(req, res) {
    try {
      const departments = await Department.findAll({
        order: [["departmentName", "ASC"]],
      });

      res.json({
        success: true,
        data: departments,
      });
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching departments",
        error: error.message,
      });
    }
  }

  static async updateDepartment(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const department = await Department.findByPk(id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      const updatedDepartment = await department.update(updates);

      res.json({
        success: true,
        message: "Department updated successfully",
        data: updatedDepartment,
      });
    } catch (error) {
      console.error("Department update error:", error);
      res.status(500).json({
        success: false,
        message: "Error updating department",
        error: error.message,
      });
    }
  }

  static async deleteDepartment(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      await department.destroy();

      res.json({
        success: true,
        message: "Department deleted successfully",
      });
    } catch (error) {
      console.error("Department deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting department",
        error: error.message,
      });
    }
  }

  // Add a new method to get a single department
  static async getDepartment(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      console.error("Error fetching department:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching department",
        error: error.message,
      });
    }
  }
}

module.exports = DepartmentController;
