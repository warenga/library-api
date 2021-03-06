import {Book} from '../models';

module.exports = {
  create(req, res) {
    return Book
      .create({
        title: req.body.title,
        author: req.body.author,
      })
      .then(book => res.status(201).send(book))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Book
      .findAll()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },

  find(req, res) {
    return Book
      .findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'Book does not exist'
          })
        }
        res.status(200).send(book)
      })
      .catch(error => res.status(400).send(error));
  },
};
