const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  doctorType: {
    type: DataTypes.ENUM('OP', 'IP', 'Both'),
    allowNull: false
  },
  specialistType: {
    type: DataTypes.ENUM('Physician', 'Surgeon', 'Both'),
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM('Residence', 'Visiting', 'Hide'),
    allowNull: false
  },
  consultantName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  languages: {
    type: DataTypes.JSON,
    allowNull: true
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  specialization: {
    type: DataTypes.JSON,
    allowNull: true
  },
  qualification: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  registrationNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true
  },
  medicalLicenseUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  associatedHospitals: {
    type: DataTypes.JSON,
    allowNull: true
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'hospitals',
      key: 'id'
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postalCode: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  emergencyFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  revisitFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  bankName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  branch: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  accountNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  ifscCode: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  employmentType: {
    type: DataTypes.ENUM('Full-Time', 'Part-Time'),
    allowNull: true
  },
  workStartTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  workEndTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  consultationType: {
    type: DataTypes.JSON,
    allowNull: true
  },
  residenceStatus: {
    type: DataTypes.ENUM('Local', 'Outstation'),
    allowNull: true
  },
  joiningDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  activeStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  emergencyContactName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  emergencyContactNumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  medicalLicense: {
    type: DataTypes.STRING,
    allowNull: true
  },
  documents: {
    type: DataTypes.JSON,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'doctors',
  timestamps: true
});

module.exports = Doctor; 