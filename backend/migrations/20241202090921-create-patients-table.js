module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Note: Model name is 'users', not 'User'
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      contact_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      medical_history: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      blood_type: {
        type: Sequelize.ENUM,
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female', 'Other'],
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patients');
  }
};
