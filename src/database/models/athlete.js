module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define('Athlete', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    teamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    positionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    twitterHandle: {
      default: '',
      type: DataTypes.STRING,
    },
    instagramHandle: {
      default: '',
      type: DataTypes.DATE,
    },
  }, {});

  Athlete.associate = (models) => {
    Athlete.hasMany(models.FanPrediction, {
      foreignKey: 'athleteId',
      onDelete: 'cascade',
      hooks: 'true',
    });
    Athlete.hasMany(models.AthleteStatistic, {
      foreignKey: 'athleteId',
      onDelete: 'cascade',
      hooks: 'true',
    });
    Athlete.belongsTo(models.Team, {
      foreignKey: 'teamId',
      allowNull: false,
    });
  };

  return Athlete;
};
