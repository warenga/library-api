'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email address must be valid'
        }
      },
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
  }, {});

  return User;
};
