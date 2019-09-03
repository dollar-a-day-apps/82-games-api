module.exports = (sequelize, DataTypes) => {
  const Fan = sequelize.define('Fan', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    authId: {
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
