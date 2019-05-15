import {Book} from '../models';
import {Checkout} from '../models';

module.exports = {
  create(req, res) {
    return Checkout
      .create({
        userId: req.user.id,
        bookId: req.body.bookId,
      })
      .then(() => res.status(201).send({message: "You've checkout book"}))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Checkout
      .findAll()
      .then(checkouts => res.status(200).send(checkouts))
      .catch(error => res.status(400).send(error));
  },
};
