const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bek' },
  { id: 3, name: 'chris' },
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).end();
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const findUser = users.find(u => u.id === id);
  if (findUser == null) return res.status(404).end();
  res.json(findUser);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const findIndex = users.findIndex(u => u.id === id);
  users.splice(findIndex, 1);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (name == null) return res.status(400).end();

  const hasUser = users.some(u => u.name === name);
  if (hasUser) return res.status(409).end();

  const newUser = { id: new Date().getMilliseconds(), name };
  console.log(newUser);
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  const findIndex = users.findIndex(u => u.id === id);
  users[findIndex].name = name;

  res.json(users[findIndex]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;