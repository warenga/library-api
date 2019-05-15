'use strict';

module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('Checkout', {
    returnedOn: {
      type: DataTypes.DATE,
    },
  }, {});

  Checkout.associate = function(models) {
    Checkout.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Checkout.belongsTo(models.Book, {
      foreignKey: 'bookId',
    });
  };

  return Checkout;
};
