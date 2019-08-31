module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Athletes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      teamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      positionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      twitterHandle: {
        default: '',
        type: Sequelize.STRING,
      },
      instagramHandle: {
        default: '',
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
  down: queryInterface => queryInterface.dropTable('Athletes'),
};
