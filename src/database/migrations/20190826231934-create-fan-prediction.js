module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('FanPredictions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      athleteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fanId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      performanceStatistics: {
        allowNull: false,
        type: Sequelize.JSON,
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
  down: queryInterface => queryInterface.dropTable('FanPredictions'),
};
