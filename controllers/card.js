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
    .catch((e) => {
      next(e);
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;

  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((e) => {
      if (e.errors) {
        next(ApiError.BadRequest(Object.values(e.errors)[0].message));
        return;
      }
      next(e);
    });
};

const deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .orFail(() => {
      next(ApiError.NotFound('Карточка с данным id не найдена'));
    })
    .then((card) => {
      if (req.user._id !== `${card.owner}`) {
        next(ApiError.Forbidden('Id владельца карточки отлично от данного пользователя'));
        return;
      }

      Card.deleteOne(card)
        .then((removedCard) => {
          res.send(removedCard);
        });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id карточки'));
        return;
      }
      next(e);
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
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id карточки'));
        return;
      }
      next(e);
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
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id карточки'));
        return;
      }
      next(e);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
