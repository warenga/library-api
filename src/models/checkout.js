'use strict';

module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('Checkout', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    dateCheckedOut: DataTypes.DATE
  }, {});

  Checkout.associate = function(models) {
    Checkout.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };

  Checkout.associate = function(models) {
    Checkout.belongsTo(models.Books, {
      foreignKey: 'bookId',
    });
  };

  return Checkout;
};
