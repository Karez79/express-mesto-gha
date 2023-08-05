const { Router } = require('express');
const validator = require('../middlewares/validation');
const userController = require('../controllers/user');

const router = new Router();

router.get('/me', userController.getCurrentUserInfo);

router.get('/', userController.getUsers);
router.get('/:userId', validator.getUserByIdValidation, userController.getUserById);

router.patch('/me', validator.updateProfileValidation, userController.updateProfile);

router.patch('/me', userController.updateProfile);

router.patch('/me/avatar', validator.updateAvatarValidation, userController.updateAvatar);

module.exports = router;
