const Staff = require('../models/Staff');
const User = require('../models/User');
const Department = require('../models/Department');

class StaffController {
  static async createStaff(req, res) {
    try {
      const { user_id, department_id, role, hire_date, salary } = req.body;

      const newStaff = await Staff.create({
        user_id,
        department_id,
        role,
        hire_date,
        salary,
      });

      res.status(201).json({
        message: 'Staff created successfully',
        staff: newStaff,
      });
    } catch (error) {
      console.error('Error creating staff:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getStaff(req, res) {
    try {
      const staff = await Staff.findAll({
        include: [
          { model: User, attributes: ['id', 'username', 'email'] },
          { model: Department, attributes: ['name'] },
        ],
      });

      res.json(staff);
    } catch (error) {
      console.error('Error fetching staff:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async updateStaff(req, res) {
    try {
      const { id } = req.params;
      const { department_id, role, salary } = req.body;

      const staff = await Staff.findByPk(id);
      if (!staff) {
        return res.status(404).json({ message: 'Staff not found' });
      }

      const updatedStaff = await staff.update({ department_id, role, salary });

      res.json({
        message: 'Staff updated successfully',
        staff: updatedStaff,
      });
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = StaffController;
