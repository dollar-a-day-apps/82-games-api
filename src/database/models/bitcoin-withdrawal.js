module.exports = (sequelize, DataTypes) => {
  const BitcoinWithdrawal = sequelize.define('BitcoinWithdrawal', {
    ownerId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    addressId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});

  return BitcoinWithdrawal;
};
