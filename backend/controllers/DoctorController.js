const Doctor = require("../models/Doctor");
const doctorValidationSchema = require("../validators/doctorValidator");
const { Op } = require("sequelize");
const User = require("../models/User");

class DoctorController {
  // Create Doctor Profile
  static async createDoctor(req, res) {
    try {
      const doctorData = req.body;
      console.log("1. Received doctor data:", doctorData);

      // Validate request body
      const { error } = doctorValidationSchema.validate(doctorData);
      if (error) {
        console.log("2. Validation error:", error.details);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: error.details[0].message,
        });
      }

      let createdUser = null;
      try {
        // Create user first
        const userData = {
          username: doctorData.consultantName
            .toLowerCase()
            .replace(/\s+/g, "."),
          password: "Doctors1234$", // You might want to generate this
          name: doctorData.consultantName,
          email: doctorData.email,
          role: "doctor",
        };
        console.log("3. Attempting to create user with:", userData);

        createdUser = await User.create(userData);
        console.log("4. User created successfully:", createdUser.id);

        // Create doctor profile
        const doctorFields = {
          user_id: createdUser.id,
          doctorType: doctorData.doctorType,
          specialistType: doctorData.specialistType,
          availability: doctorData.availability,
          consultantName: doctorData.consultantName,
          gender: doctorData.gender,
          dob: doctorData.dob || null,
          languages: doctorData.languages || [],
          designation: doctorData.designation,
          department: doctorData.department,
          specialization: doctorData.specialization || [],
          qualification: doctorData.qualification,
          experience: doctorData.experience,
          registrationNumber: doctorData.registrationNumber,
          hospital_id: doctorData.hospital_id,
          city: doctorData.city,
          state: doctorData.state,
          country: doctorData.country,
          postalCode: doctorData.postalCode,
          address: doctorData.address,
          consultationFee: doctorData.consultationFee || 0,
          emergencyFee: doctorData.emergencyFee || 0,
          revisitFee: doctorData.revisitFee || 0,
          bankName: doctorData.bankName,
          branch: doctorData.branch,
          accountNumber: doctorData.accountNumber,
          ifscCode: doctorData.ifscCode,
          employmentType: doctorData.employmentType,
          consultationType: doctorData.consultationType || [],
          residenceStatus: doctorData.residenceStatus,
          joiningDate: doctorData.joiningDate || null,
          activeStatus: doctorData.activeStatus ?? true,
          mobile: doctorData.mobile,
          email: doctorData.email,
          emergencyContactName: doctorData.emergencyContactName,
          emergencyContactNumber: doctorData.emergencyContactNumber,
          remarks: doctorData.remarks,
          medicalLicense: doctorData.medicalLicense,
          documents: doctorData.documents || [],
          notes: doctorData.notes,
        };

        console.log(
          "5. Attempting to create doctor with fields:",
          doctorFields
        );

        const doctor = await Doctor.create(doctorFields);
        console.log("6. Doctor created successfully:", doctor.id);

        res.status(201).json({
          success: true,
          message: "Doctor created successfully",
          data: doctor,
        });
      } catch (dbError) {
        console.error("7. Database error:", {
          name: dbError.name,
          message: dbError.message,
          errors: dbError.errors,
        });

        // Cleanup user if doctor creation failed
        if (createdUser) {
          console.log("8. Cleaning up user due to doctor creation failure");
          await createdUser.destroy();
        }

        throw dbError;
      }
    } catch (error) {
      console.error("9. Final error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating doctor profile",
        error: error.message,
      });
    }
  }

  // Get Doctor Profile
  static async getDoctor(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }

      res.json({
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching doctor profile",
        error: error.message,
      });
    }
  }

  // Update Doctor Profile
  static async updateDoctor(req, res) {
    try {
      const { id } = req.params;
      const { error } = doctorValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: error.details[0].message,
        });
      }

      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }

      await doctor.update(req.body);
      res.json({
        success: true,
        message: "Doctor profile updated successfully",
        data: doctor,
      });
    } catch (error) {
      console.error("Doctor update error:", error);
      res.status(500).json({
        success: false,
        message: "Error updating doctor profile",
        error: error.message,
      });
    }
  }

  // Search Doctors
  static async searchDoctors(req, res) {
    try {
      const {
        query,
        department,
        specialization,
        availability,
        page = 1,
        limit = 10,
      } = req.query;

      const offset = (page - 1) * limit;
      const whereClause = {};

      if (query) {
        whereClause[Op.or] = [
          { consultantName: { [Op.like]: `%${query}%` } },
          { registrationNumber: { [Op.like]: `%${query}%` } },
        ];
      }

      if (department) {
        whereClause.department = department;
      }

      if (specialization) {
        whereClause.specialization = { [Op.like]: `%${specialization}%` };
      }

      if (availability) {
        whereClause.availability = availability;
      }

      const { count, rows } = await Doctor.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["consultantName", "ASC"]],
      });

      res.json({
        success: true,
        data: {
          doctors: rows,
          total: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
        },
      });
    } catch (error) {
      console.error("Doctor search error:", error);
      res.status(500).json({
        success: false,
        message: "Error searching doctors",
        error: error.message,
      });
    }
  }

  // Delete Doctor
  static async deleteDoctor(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }

      await doctor.destroy();
      res.json({
        success: true,
        message: "Doctor profile deleted successfully",
      });
    } catch (error) {
      console.error("Doctor deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting doctor profile",
        error: error.message,
      });
    }
  }
}

module.exports = DoctorController;
