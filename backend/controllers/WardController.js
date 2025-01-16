// controllers/WardController.js
const Ward = require('../models/Ward');

class WardController {
  static async createWard(req, res) {
    try {
      const { name, capacity, type, status, departmentId} = req.body;
      const ward = await Ward.create({ name, capacity, type, status, departmentId });
      res.status(201).json({ message: 'Ward created successfully', ward });
    } catch (error) {
      console.error('Ward creation error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getWards(req, res) {
    try {
      const wards = await Ward.findAll();
      res.json(wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async updateWard(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const ward = await Ward.findByPk(id);

      if (!ward) {
        return res.status(404).json({ message: 'Ward not found' });
      }

      const updatedWard = await ward.update(updates);
      res.json({ message: 'Ward updated successfully', ward: updatedWard });
    } catch (error) {
      console.error('Ward update error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async deleteWard(req, res) {
    try {
      const { id } = req.params;
      const ward = await Ward.findByPk(id);

      if (!ward) {
        return res.status(404).json({ message: 'Ward not found' });
      }

      await ward.destroy();
      res.json({ message: 'Ward deleted successfully' });
    } catch (error) {
      console.error('Ward deletion error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = WardController;
