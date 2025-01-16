const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ward = sequelize.define('Ward', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Departments',
      key: 'id',
    },
  },
}, {
  tableName: 'wards',
  timestamps: false,
});

module.exports = Ward;
