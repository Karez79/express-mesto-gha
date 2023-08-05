const { celebrate, Joi } = require('celebrate');
const objectIdRegexp = require('../services/objectIdRegexp');
const avatarUrlRegexp = require('../services/avatarUrlRegexp');

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(objectIdRegexp),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(avatarUrlRegexp),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(avatarUrlRegexp),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(avatarUrlRegexp).required(),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
});

const putLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
});

const deleteLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(objectIdRegexp),
  }),
});

module.exports = {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  putLikeValidation,
  deleteLikeValidation,
};
