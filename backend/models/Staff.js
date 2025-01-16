module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      role: {
        type: DataTypes.ENUM('doctor', 'nurse', 'technician', 'admin_staff'),
        allowNull: false,
      },
      hire_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    }, {
      tableName: 'staff',
      timestamps: false,
    });
    return Staff;
  };
  