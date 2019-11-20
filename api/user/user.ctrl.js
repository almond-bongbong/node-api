const { User } = require('../../models');

const find = async (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).end();

  try {
    const users = await User.findAll({ limit });
    return res.json(users);
  } catch (e) {
    return res.status(500).send();
  }
};

const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const findUser = await User.findOne({ where: { id } });
  if (findUser == null) return res.status(404).end();
  res.json(findUser);
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  await User.destroy({ where: { id } });
  res.status(204).end();
};

const create = async (req, res) => {
  const { name } = req.body;
  if (name == null) return res.status(400).end();

  try {
    const createdUser = await User.create({ name });
    res.status(201).json(createdUser);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).end();
    }
    return res.status(500).end();
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (Number.isNaN(id)) return res.status(400).end();
  if (!name) return res.status(400).end();

  try {
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) return res.status(404).end();

    findUser.name = name;
    await findUser.save();
    res.json(findUser);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).end();
    }
    return res.status(500).end();
  }
};

module.exports = {
  find,
  findById,
  remove,
  create,
  update,
};
