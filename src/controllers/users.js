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
      .then(user => {
        const userInfo = { _id: user.id };
        const token = createToken(userInfo);
        res.status(200).send({
          message: 'You have been successfully registered',
          token,
          userDetails: user
        });
      })
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return User
      .findOne({
        where: { username: req.body.username }
      })
      .then(user => {
        console.log('user', user)
        if (!user) {
          return res.status(404).send({
            success: false,
            error: 'User is not registered'
          });
        }
        const password = bcrypt.compareSync(req.body.password, user.password); // true
        if (!password) {
          return res.send('Password does not match');
        }
        const userInfo = { _id: user.id };
        const token = createToken(userInfo);
        return res.status(200).send({
          message: 'You have been successfully logged in',
          token,
        });
      })
      .catch(error => {
        console.log(error, 'err')
        return res.status(400).send(error)
      });
  },

  logout(req, res) {
    return res.status(200).send({message: 'You have been logged out'});
  },

  list(req, res) {
    return User
      .findAll()
      .then(users => {
        if (!user) {
          return res.status(404).send({
            message: 'There are no users yet!'
          });
        }
        return res.status(200).send(users)
      })
      .catch(error => res.status(400).send(error));
  },

  find(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'We could not find this user',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const updateData = req.body;
    return User
      .update(updateData,
      {
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).send({
        message: 'Your changes have been successfully applied'
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).send({ message: 'User successfully deleted' }))
      .catch(error => res.status(400).send(error));
  }
};
