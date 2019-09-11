module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('AthleteStatistics', {
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
      performanceStatistics: {
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
  down: queryInterface => queryInterface.dropTable('AthleteStatistics'),
};
