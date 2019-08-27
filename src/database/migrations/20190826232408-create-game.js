module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      homeTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      arena: {
        allowNull: false,
        type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Games'),
};
