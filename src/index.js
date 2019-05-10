import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';

import routes from './routes';

const app = express();
app.use(cors()); // Prevents CORS errors when cosuming the API

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.PORT, () =>
  console.log('Library app listening on port 8000')
);
