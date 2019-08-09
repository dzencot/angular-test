import express from 'express';

import { getData } from './utils/dataLib'
import uniqid from 'uniqid';
import { generateUser } from './utils/generatorFakeData';

const app = express();
let users = [];

for (let i = 0; i <= 10; i += 1) {
  const user = { ...generateUser(), id: uniqid() };
  users.push(user);
}

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
    // const data = await getData();
    // res.send(JSON.stringify(data));
    res.send(JSON.stringify(users));
  } catch (e) {
    console.log(e);
    return [];
  }
});

app.post('/', async (req, res) => {
  const { body } = req;
  const user = { ...body, id: uniqid() };
  console.log('add user:');
  console.log(user);
  res.send(JSON.stringify({ user }));
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`delete ${id}`)
  res.send(JSON.stringify({ id }));
});

app.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, lastName } = req.body;
  console.log(`edit ${id}`)
  const user = users.find(item => item.id === id);
  user.name = name;
  user.lastName = lastName;
  const newUsers = users.filter(item => item.id !== id);
  newUsers.push(user);
  users = newUsers;
  console.log('new users:');
  console.log(users);
  res.send(JSON.stringify(user));
});

app.listen(8000, () => {
  console.log('Server started!');
});
