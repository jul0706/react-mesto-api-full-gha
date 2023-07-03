require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowCors = require('./middlewares/cors');

const app = express();
const { BASE_URL_DB = 'mongodb://mestodb.api.jul.iv.mesto.nomoreparties.sbs:28015' } = process.env;

mongoose.connect(BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(allowCors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(process.env.PORT);
