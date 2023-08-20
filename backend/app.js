require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mesto_full-3' } = process.env;
const app = express();

app.use(helmet());

app.use(cors({ origin: ['http://localhost:3001', 'https://fadinproject.nomoreparties.co'], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookies());

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);
app.use('/', authRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found - Страница не найдена'));
});
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  console.error(err);
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(statusCode).send({ message: 'На сервере произошла ошибка' });
  }
});

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
