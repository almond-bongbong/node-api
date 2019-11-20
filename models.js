const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? './db.test.sqlite' : './db.sqlite',
  logging: process.env.NODE_ENV !== 'test',
});

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  }
});

module.exports = { User, sequelize, Sequelize };