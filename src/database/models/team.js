module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    referenceId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    logoUrl: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
    websiteUrl: {
      defaultValue: '',
      type: DataTypes.STRING,
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

  Team.associate = (models) => {
    Team.hasMany(models.Athlete, {
      foreignKey: 'teamId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return Team;
};
