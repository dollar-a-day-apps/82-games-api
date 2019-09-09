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
        default: '',
        type: Sequelize.STRING,
      },
      ticketCount: {
        default: 0,
        type: Sequelize.INTEGER,
      },
      trophyCount: {
        default: 0,
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
