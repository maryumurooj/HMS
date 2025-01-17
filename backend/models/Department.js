const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentCd: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    medical: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    medicalOptions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inchargeCd: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contactNo1: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    contactNo2: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    costCenterCd: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    departmentNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    s1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    s2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gstNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    serviceTaxRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    serviceTaxExempted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taxTemp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    printSetting: {
      type: DataTypes.ENUM("departmentWise", "serviceGroupWise", "serviceWise"),
      defaultValue: "departmentWise",
    },
    showPendingInvestigations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    showDoneByDoctor2Field: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPediatric: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    showTreatedWard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    showBloodBankIndents: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "departments",
    timestamps: true,
  }
);

module.exports = Department;
