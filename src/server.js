import express from 'express';

import { getData } from './utils/dataLib'
import { generateUser } from './utils/generatorFakeData';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.get('/', async (req, res) => {
  console.log('get request');
  try {
    const data = await getData();
    res.send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    return [];
  }
});

app.post('/', async (req, res) => {
  const { body } = req;

  res.send(JSON.stringify({ body }));
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`delete ${id}`)
  res.send(id);
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`edit ${id}`)
  console.log(body);
  res.send(id);
});

app.listen(8000, () => {
  console.log('Server started!');
});
