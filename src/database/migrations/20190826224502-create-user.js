module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profilePictureUrl: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      ticketCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      trophyCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      authId: {
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
  down: queryInterface => queryInterface.dropTable('Users'),
};
