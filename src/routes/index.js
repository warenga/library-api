import {users as usersController} from '../controllers';
import {books as booksController} from '../controllers';
import {checkout as checkoutController} from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Library API',
  }));

  app.post('/api/user', usersController.create);
  app.get('/api/users', usersController.list);

  app.post('/api/book', booksController.create);
  app.get('/api/books', booksController.list);

  app.post('/api/checkoutBook', checkoutController.create);
  app.get('/api/checkoutBooks', checkoutController.list)
};
