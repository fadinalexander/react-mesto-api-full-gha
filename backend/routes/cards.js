const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getCards, createCard, likeCard, dislikeCard, deleteCard } = require('../controllers/cards');

const URLreg = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)[a-zA-Z0-9-]+\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().regex(URLreg),
    }),
  }),
  createCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  dislikeCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard,
);

module.exports = router;
