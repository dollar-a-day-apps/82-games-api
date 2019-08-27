module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    dateTime: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    homeTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    arena: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  Game.associate = (models) => {
    Game.hasMany(models.FanPrediction, {
      foreignKey: 'gameId',
      onDelete: 'cascade',
      hooks: 'true',
    });
    Game.hasMany(models.AthleteStatistic, {
      foreignKey: 'gameId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return Game;
};
