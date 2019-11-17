const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./api/user');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;