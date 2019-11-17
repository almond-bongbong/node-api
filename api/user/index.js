const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bek' },
  { id: 3, name: 'chris' },
];

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).end();
  res.json(users.slice(0, limit));
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const findUser = users.find(u => u.id === id);
  if (findUser == null) return res.status(404).end();
  res.json(findUser);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const findIndex = users.findIndex(u => u.id === id);
  users.splice(findIndex, 1);
  res.status(204).end();
});

router.post('', (req, res) => {
  const { name } = req.body;
  if (name == null) return res.status(400).end();

  const hasUser = users.some(u => u.name === name);
  if (hasUser) return res.status(409).end();

  const newUser = { id: new Date().getMilliseconds(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (Number.isNaN(id)) return res.status(400).end();
  if (!name) return res.status(400).end();

  const findIndex = users.findIndex(u => u.id === id);
  if (findIndex === -1) return res.status(404).end();
  if (users.some(u => u.name === name)) return res.status(409).end();

  users[findIndex].name = name;
  res.json(users[findIndex]);
});

module.exports = router;
