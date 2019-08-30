module.exports = (sequelize, DataTypes) => {
  const Fan = sequelize.define('Fan', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profilePictureUrl: {
      default: '',
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    auth0Id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  Fan.associate = (models) => {
    Fan.hasMany(models.FanPrediction, {
      foreignKey: 'fanId',
      onDelete: 'cascade',
      hooks: 'true',
    });
  };

  return Fan;
};
