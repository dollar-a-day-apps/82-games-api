module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('UserPaymentCards', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('UserPaymentCards', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
