import {Checkout} from '../models';

module.exports = {
  create(req, res) {
    return Checkout
      .create({
        userId: req.body.user,
        bookId: req.body.book,
      })
      .then((book) => res.status(201).send(book))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Checkout
      .findAll()
      .then(checkouts => res.status(200).send(checkouts))
      .catch(error => res.status(400).send(error));
  },
};
