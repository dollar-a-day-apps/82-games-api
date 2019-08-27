module.exports = (sequelize, DataTypes) => {
  const FanPrediction = sequelize.define('FanPrediction', {
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    athleteId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    fanId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    performanceStatistics: {
      allowNull: false,
      type: DataTypes.JSON,
    },
  }, {});

  FanPrediction.associate = (models) => {
    FanPrediction.belongsTo(models.Athlete, {
      foreignKey: 'athleteId',
      allowNull: false,
    });
    FanPrediction.belongsTo(models.Game, {
      foreignKey: 'gameId',
      allowNull: false,
    });
    FanPrediction.belongsTo(models.Fan, {
      foreignKey: 'fanId',
      allowNull: false,
    });
  };

  return FanPrediction;
};
