const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const avatarUrlRegexp = require('../services/avatarUrlRegexp');
const objectIdRegexp = require('../services/objectIdRegexp');
const cardController = require('../controllers/card');

const router = new Router();

router.get('/', cardController.getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(avatarUrlRegexp).required(),
  }),
}), cardController.createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
}), cardController.deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
}), cardController.putLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
}), cardController.deleteLike);

module.exports = router;
