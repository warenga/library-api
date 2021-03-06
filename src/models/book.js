'use strict';

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      required: true
    },
    author: {
      type: DataTypes.STRING,
      required: true
    },
    borrowed: {
      type: DataTypes.BOOLEAN,
      required: true,
      default: 'false',
      enum: ['true', 'false'],
    },
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.Checkout, {
      foreignKey: 'checkoutId',
      as: 'checkouts',
    });
  };

  return Book;
};
