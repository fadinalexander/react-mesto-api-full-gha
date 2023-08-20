const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');

const URLreg = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post('/signout', logout);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(URLreg),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = router;
