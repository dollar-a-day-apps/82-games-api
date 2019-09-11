module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GameStatistics', {
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
      homeTeamPoints: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      awayTeamPoints: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      homeTeamStatistics: {
        type: Sequelize.JSON,
      },
      awayTeamStatistics: {
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
  down: queryInterface => queryInterface.dropTable('GameStatistics'),
};
