import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Prevents CORS errors when cosuming the API

app.get('/', (req, res) =>
  res.send('Hello World')
);

app.listen(process.env.PORT, () =>
  console.log('Library app listening on port 8000')
);
