module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profilePictureUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profileTagLine: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.UserPaymentCard, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return User;
};
