import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Hello, you!');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
