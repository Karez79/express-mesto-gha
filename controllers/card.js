const Card = require('../models/card');
const ApiError = require('../exceptions/api-error');

const getCards = (req, res, next) => {
  Card.find()
    .orFail(() => {
      next(ApiError.NotFound('Карточки не были найдены'));
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные'));
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      next(ApiError.NotFound('Карточка с данным id не найдена'));
    })
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      next(ApiError.BadRequest('Некорректный id карточки'));
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  ).orFail(() => {
    next(ApiError.NotFound('Карточка с данным id не найдена'));
  })
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      next(ApiError.BadRequest('Некорректный id карточки или пользователя'));
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    next(ApiError.NotFound('Карточка с данным id не найдена'));
  })
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные или id карточки'));
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
