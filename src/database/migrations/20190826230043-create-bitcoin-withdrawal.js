module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('BitcoinWithdrawals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      addressId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  ),
  down: queryInterface => queryInterface.dropTable('BitcoinWithdrawals'),
};
