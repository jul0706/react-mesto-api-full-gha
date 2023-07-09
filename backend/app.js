import * as dotenv from 'dotenv';

dotenv.config();
/* require('dotenv').config(); */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { BASE_URL_DB = 'mongodb://127.0.0.1/mestodb' } = process.env;

mongoose.connect(BASE_URL_DB, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cors);
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(app.listen(process.env.PORT || 3000));
