module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    logoUrl: {
      default: '',
      type: DataTypes.STRING,
    },
    websiteUrl: {
      default: '',
      type: DataTypes.STRING,
    },
    twitterHandle: {
      default: '',
      type: DataTypes.STRING,
    },
    instagramHandle: {
      default: '',
      type: DataTypes.STRING,
    },
  }, {});

  Team.associate = (models) => {
    Team.hasMany(models.Athlete, {
      foreignKey: 'teamId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return Team;
};
