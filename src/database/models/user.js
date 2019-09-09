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
      default: '',
      type: DataTypes.STRING,
    },
    ticketCount: {
      default: 0,
      type: DataTypes.INTEGER,
    },
    trophyCount: {
      default: 0,
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
