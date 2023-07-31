const User = require('../models/user');
const ApiError = require('../exceptions/api-error');

const getUsers = (req, res, next) => {
  User.find()
    .orFail(() => {
      next(ApiError.NotFound('Пользователи не были найдены'));
    })
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(ApiError.NotFound('Пользователь с данным id не найден'));
    })
    .then((user) => res.send(user))
    .catch(() => {
      next(ApiError.NotFound('Некорректный id пользователя'));
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные'));
    });
};

const updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  ).orFail(() => {
    next(ApiError.NotFound('Пользователь с данным id не найден'));
  })
    .then((user) => res.send(user))
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные или id пользователя'));
    });
};

const updateAvatar = (req, res, next) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  }).orFail(() => {
    next(ApiError.NotFound('Пользователь с данным id не найден'));
  })
    .then((user) => res.send(user))
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные или id пользователя'));
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
