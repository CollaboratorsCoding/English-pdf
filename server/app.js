const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const api = require('./api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', api);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})


module.exports = app;
