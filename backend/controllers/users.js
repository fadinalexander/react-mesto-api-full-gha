const { ValidationError } = require('mongoose').Error;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const InternalServerError = require('../errors/InternalServerError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      next(error);
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Bad Request - Запрос не может быть обработан'));
      } else {
        next(error);
      }
    });
};

const getMyUser = (req, res, next) => {
  return User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      next(error);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Bad Request - Запрос не может быть обработан'));
      } else if (error.code === 11000) {
        next(new ConflictError('Conflict - Пользователь с такими данными уже существует'));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('userId', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      });
      res.send(user);
    })
    .catch((error) => {
      next(error);
    });
};

const logout = (req, res) => {
  res.clearCookie('userId').send({ message: 'Вы успешно вышли из профиля' });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Bad Request - Запрос не может быть обработан'));
      } else {
        next(new InternalServerError('Internal server Error - на сервере произошла ошибка'));
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Bad Request - Запрос не может быть обработан'));
      } else {
        next(new InternalServerError('Internal server Error - на сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  getMyUser,
  createUser,
  login,
  logout,
  updateProfile,
  updateAvatar,
};
