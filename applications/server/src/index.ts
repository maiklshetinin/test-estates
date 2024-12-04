import express from 'express';
import cors from 'cors';
import { EstateResolver } from './resolvers/estate.resolver';

const app = express();
const port = 3000;

// Настройка CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Разрешить только с этого домена
  })
);

const estates = new EstateResolver();

app.get('/estates', (req, res) => {
  const params = req.query;
  const result = estates.getEstates(params);
  res.json(result);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
