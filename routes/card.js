const { Router } = require('express');
const validator = require('../middlewares/validation');
const cardController = require('../controllers/card');

const router = new Router();

router.get('/', cardController.getCards);

router.post('/', validator.createCardValidation, cardController.createCard);

router.delete('/:cardId', validator.deleteCardValidation, cardController.deleteCard);

router.put('/:cardId/likes', validator.putLikeValidation, cardController.putLike);

router.delete('/:cardId/likes', validator.deleteLikeValidation, cardController.deleteLike);

module.exports = router;
