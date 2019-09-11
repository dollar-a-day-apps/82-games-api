module.exports = (sequelize, DataTypes) => {
  const AthleteStatistic = sequelize.define('AthleteStatistic', {
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    athleteId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    performanceStatistics: {
      type: DataTypes.JSON,
    },
  }, {});

  AthleteStatistic.associate = (models) => {
    AthleteStatistic.belongsTo(models.Athlete, {
      foreignKey: 'athleteId',
      allowNull: false,
    });
    AthleteStatistic.belongsTo(models.Game, {
      foreignKey: 'gameId',
      allowNull: false,
    });
  };

  return AthleteStatistic;
};
