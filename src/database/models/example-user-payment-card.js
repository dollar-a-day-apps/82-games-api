module.exports = (sequelize, DataTypes) => {
  const UserPaymentCard = sequelize.define('UserPaymentCard', {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    metadata: {
      allowNull: false,
      type: DataTypes.JSON,
    },
  }, {});

  UserPaymentCard.associate = (models) => {
    UserPaymentCard.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
    });
  };

  return UserPaymentCard;
};
