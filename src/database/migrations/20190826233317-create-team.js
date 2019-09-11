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
      referenceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logoUrl: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      websiteUrl: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      twitterHandle: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      instagramHandle: {
        defaultValue: '',
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
