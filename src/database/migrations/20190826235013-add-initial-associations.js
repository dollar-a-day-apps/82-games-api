module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AthleteStatistics', 'athleteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Athletes',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });

    await queryInterface.changeColumn('AthleteStatistics', 'gameId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Games',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });

    await queryInterface.changeColumn('UserPredictions', 'athleteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Athletes',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });

    await queryInterface.changeColumn('UserPredictions', 'gameId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Games',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });

    await queryInterface.changeColumn('UserPredictions', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });

    await queryInterface.changeColumn('Athletes', 'teamId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Teams',
        key: 'id',
      },
      onDelete: 'cascade',
      hooks: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AthleteStatistics', 'athleteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('AthleteStatistics', 'gameId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('UserPredictions', 'athleteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('UserPredictions', 'gameId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('UserPredictions', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('Athletes', 'teamId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
