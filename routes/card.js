const { Router } = require('express');

const cardController = require('../controllers/card');

const router = new Router();

router.get('/', cardController.getCards);
router.post('/', cardController.createCard);
router.delete('/:cardId', cardController.deleteCard);

router.put('/:cardId/likes', cardController.putLike);
router.delete('/:cardId/likes', cardController.deleteLike);

module.exports = router;
