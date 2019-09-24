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
    referenceId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    positionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    twitterHandle: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
    instagramHandle: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
  }, {});

  Athlete.associate = (models) => {
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
