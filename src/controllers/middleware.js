
const User = require('../models').User;
const Document = require('../models').Document;
const jwt = require('jsonwebtoken');

const secretTokenKey = process.env.SECRET_TOKEN_KEY;

class MiddlewareController {
  authMiddleware(req, res, next) {
    const token = req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'Opps! You need a token to access this'
      });
    }

    jwt.verify(token, secretTokenKey, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Token provided is incorrect'
        });
      }

      User
        .findByPk(decoded._id)
        .then((user) => {
          if (!user) {
            return 'We could not find this user';
          }
          req.user = user;
          next();
        });
    });
  }
}

module.exports = new MiddlewareController();
