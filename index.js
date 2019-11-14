const express = require('express');
const morgan = require('morgan');
const app = express();

const logger = (req, res, next) => {
  console.log('i am logger');
  next();
};

const logger2 = (req, res, next) => {
  console.log('i am logger 2');
  next();
};

app.use(logger);
app.use(logger2);
app.use(morgan('dev'));

app.listen(3000, () => {
  console.log('listen server');
});
