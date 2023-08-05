const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const objectIdRegexp = require('../services/objectIdRegexp');
const avatarUrlRegexp = require('../services/avatarUrlRegexp');
const userController = require('../controllers/user');

const router = new Router();

router.get('/me', userController.getCurrentUserInfo);

router.get('/', userController.getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(objectIdRegexp),
  }),
}), userController.getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(avatarUrlRegexp),
  }),
}), userController.updateProfile);
router.patch('/me/avatar',celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(avatarUrlRegexp),
  }),
}), userController.updateAvatar);

module.exports = router;
