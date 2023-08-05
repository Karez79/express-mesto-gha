const { Router } = require('express');

const userController = require('../controllers/user');

const router = new Router();

router.get('/me', userController.getCurrentUserInfo);

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);

router.patch('/me', userController.updateProfile);
router.patch('/me/avatar', userController.updateAvatar);

module.exports = router;
