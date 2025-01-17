const Hospital = require('../models/Hospital');

class HospitalController {
  // Get all hospitals
  static async getHospitals(req, res) {
    try {
      const hospitals = await Hospital.findAll({
        where: { status: 'active' },
        attributes: ['id', 'name'], // Only send necessary fields
        order: [['name', 'ASC']] // Sort by name
      });

      res.json({
        success: true,
        data: hospitals
      });
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching hospitals',
        error: error.message
      });
    }
  }
}

module.exports = HospitalController; 