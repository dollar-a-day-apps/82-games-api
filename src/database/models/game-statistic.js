module.exports = (sequelize, DataTypes) => {
  const GameStatistic = sequelize.define('GameStatistic', {
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    homeTeamPoints: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    awayTeamPoints: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    homeTeamStatistics: {
      type: DataTypes.JSON,
    },
    awayTeamStatistics: {
      type: DataTypes.JSON,
    },
  }, {});

  GameStatistic.associate = (models) => {
    GameStatistic.belongsTo(models.Game, {
      foreignKey: 'gameId',
      allowNull: false,
    });
  };

  return GameStatistic;
};
