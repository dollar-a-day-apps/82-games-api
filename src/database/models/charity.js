module.exports = (sequelize, DataTypes) => {
  const Charity = sequelize.define('Charity', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    logoUrl: {
      default: '',
      type: DataTypes.STRING,
    },
  }, {});

  return Charity;
};
