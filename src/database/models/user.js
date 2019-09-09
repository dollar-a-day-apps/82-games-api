module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profilePictureUrl: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
    ticketCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    trophyCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    authId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.UserPrediction, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return User;
};
