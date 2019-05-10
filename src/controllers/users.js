import {User} from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';

const secretTokenKey = process.env.SECRET_TOKEN_KEY;
// Generate a salt
const salt = bcrypt.genSaltSync();
// creates a token with the user details provided
const createToken = user => jwt.sign(user, secretTokenKey);
// Hash the password with the salt
const generateHash = password => bcrypt.hashSync(password, salt);

module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: generateHash(req.body.password),
      })
      .then(() => res.status(201).send('Successfully created User'))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findAll({
        where: {
          id: req.body.id
        }
      })
      .then(user => {
        if (!user) {
          res.status(404).send('User not found')
        }


      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
};
