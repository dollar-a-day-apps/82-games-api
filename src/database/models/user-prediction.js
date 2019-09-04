module.exports = (sequelize, DataTypes) => {
  const UserPrediction = sequelize.define('UserPrediction', {
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    athleteId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    performanceStatistics: {
      allowNull: false,
      type: DataTypes.JSON,
    },
  }, {});

  UserPrediction.associate = (models) => {
    UserPrediction.belongsTo(models.Athlete, {
      foreignKey: 'athleteId',
      allowNull: false,
    });
    UserPrediction.belongsTo(models.Game, {
      foreignKey: 'gameId',
      allowNull: false,
    });
    UserPrediction.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
    });
  };

  return UserPrediction;
};
