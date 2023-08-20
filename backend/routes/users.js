const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const URLreg = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;

const { getUsers, getUser, getMyUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(URLreg),
    }),
  }),
  updateAvatar,
);

module.exports = router;
