module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('Staff', 'departmentId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'Departments',
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      });
  },
  async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('Staff', 'departmentId');
  },
};
