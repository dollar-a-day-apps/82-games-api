module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profilePictureUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profileTagLine: {
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
