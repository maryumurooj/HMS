'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      doctorType: {
        type: Sequelize.ENUM('OP', 'IP', 'Both'),
        allowNull: false
      },
      specialistType: {
        type: Sequelize.ENUM('Physician', 'Surgeon', 'Both'),
        allowNull: false
      },
      availability: {
        type: Sequelize.ENUM('Residence', 'Visiting', 'Hide'),
        allowNull: false
      },
      consultantName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      // ... Add all other fields from the model ...
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
    await queryInterface.dropTable('doctors');
  }
}; 