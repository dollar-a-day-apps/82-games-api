module.exports = (sequelize, DataTypes) => {
  const BitcoinAddress = sequelize.define('BitcoinAddress', {
    ownerId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    balance: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});

  return BitcoinAddress;
};
