import {users as usersController} from '../controllers';
import {books as booksController} from '../controllers';
import {checkout as checkoutController} from '../controllers';
import {middleware} from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Library API',
  }));

  app.post('/api/login', usersController.login);
  app.post('/api/register', usersController.create);
  app.get('/api/users', usersController.list);

  /* authentication middleware */
  app.use(middleware.authMiddleware);

  app.get('/api/user/:id', usersController.find);
  app.put('/api/user/:id', usersController.update);
  app.delete('api/user/:id', usersController.delete);
  app.post('/api/logout', usersController.logout);

  app.post('/api/book', booksController.create);
  app.get('/api/books', booksController.list);
  app.get('/api/book/:id', booksController.find);

  app.post('/api/checkoutBook', checkoutController.create);
  app.get('/api/checkoutBooks', checkoutController.list)
};
