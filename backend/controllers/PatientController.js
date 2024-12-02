const Patient = require('../models/Patient');
const User = require('../models/User');
const { Op } = require('sequelize');

class PatientController {
  // Create Patient Profile
  static async createProfile(req, res) {
    try {
      const { 
        name, 
        date_of_birth, 
        contact_number, 
        address, 
        medical_history, 
        blood_type,
        gender 
      } = req.body;

      // Ensure user is creating their own profile or is an admin
      if (req.user.role !== 'admin' && req.user.id !== req.body.user_id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Check if patient profile already exists
      const existingPatient = await Patient.findOne({ 
        where: { user_id: req.user.id } 
      });

      if (existingPatient) {
        return res.status(400).json({ message: 'Patient profile already exists' });
      }

      // Create patient profile
      const newPatient = await Patient.create({
        user_id: req.user.id,
        name,
        date_of_birth,
        contact_number,
        address,
        medical_history,
        blood_type,
        gender
      });

      res.status(201).json({ 
        message: 'Patient profile created successfully', 
        patient: newPatient 
      });
    } catch (error) {
      console.error('Patient profile creation error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Get Patient Profile
  static async getProfile(req, res) {
    try {
      const patient = await Patient.findOne({
        where: { user_id: req.user.id },
        include: [{ 
          model: User, 
          attributes: ['email'] 
        }]
      });

      if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
      }

      res.json(patient);
    } catch (error) {
      console.error('Patient profile fetch error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Update Patient Profile
  static async updateProfile(req, res) {
    try {
      const { 
        name, 
        contact_number, 
        address, 
        medical_history, 
        blood_type 
      } = req.body;

      const patient = await Patient.findOne({ 
        where: { user_id: req.user.id } 
      });

      if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
      }

      // Update patient profile
      const updatedPatient = await patient.update({
        name, 
        contact_number, 
        address, 
        medical_history, 
        blood_type
      });

      res.json({ 
        message: 'Patient profile updated successfully', 
        patient: updatedPatient 
      });
    } catch (error) {
      console.error('Patient profile update error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Search Patients (Admin only)
  static async searchPatients(req, res) {
    try {
      // Ensure only admin can search
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const { query, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const searchCondition = query ? {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { contact_number: { [Op.like]: `%${query}%` } }
        ]
      } : {};

      const { count, rows } = await Patient.findAndCountAll({
        where: searchCondition,
        include: [{ 
          model: User, 
          attributes: ['email'] 
        }],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        patients: rows,
        totalPatients: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      console.error('Patient search error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = PatientController;