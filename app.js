const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();

const SERVER_ERROR = 500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Произошло ошибка ${err.name}: ${err.message}`));

app.use(requestLogger);

app.use(routes);
app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
