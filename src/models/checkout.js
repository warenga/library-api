'use strict';

module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('Checkout', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    dateCheckedOut: DataTypes.DATE
  }, {});

  Checkout.associate = function(models) {
    Checkout.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  Checkout.associate = function(models) {
    Checkout.belongsTo(models.Book, {
      foreignKey: 'bookId',
    });
  };

  return Checkout;
};
