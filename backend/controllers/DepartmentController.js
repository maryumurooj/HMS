// controllers/DepartmentController.js
const Department = require('../models/Department');

class DepartmentController {
  static async createDepartment(req, res) {
    try {
      const { name, description, head_of_department } = req.body;
      const department = await Department.create({ name, description, head_of_department });
      res.status(201).json({ message: 'Department created successfully', department });
    } catch (error) {
      console.error('Department creation error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getDepartments(req, res) {
    try {
      const departments = await Department.findAll();
      res.json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async updateDepartment(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const updatedDepartment = await department.update(updates);
      res.json({ message: 'Department updated successfully', department: updatedDepartment });
    } catch (error) {
      console.error('Department update error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async deleteDepartment(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      await department.destroy();
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Department deletion error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = DepartmentController;
