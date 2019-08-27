module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('BitcoinAddresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      balance: {
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
  down: queryInterface => queryInterface.dropTable('BitcoinAddresses'),
};
