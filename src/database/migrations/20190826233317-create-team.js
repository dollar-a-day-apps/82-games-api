module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Teams', {
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
      logoUrl: {
        default: '',
        type: Sequelize.STRING,
      },
      websiteUrl: {
        default: '',
        type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Teams'),
};
