const ms = require('ms');
const User = require('../models/user');
const ApiError = require('../exceptions/api-error');
const UserService = require('../services/userAuth');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  UserService.registration(name, about, avatar, email, password).then((token) => {
    res.cookie('accessToken', token, {
      maxAge: ms('7d'),
      httpOnly: true,
    });

    res.status(200).send({
      name,
      about,
      avatar,
      email,
    });
  }).catch((e) => next(e));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  UserService.login(email, password).then((token) => {
    res.cookie('accessToken', token, {
      maxAge: ms('7d'),
      httpOnly: true,
    });

    res.status(200).send({ token });
  }).catch((e) => next(e));
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(ApiError.NotFound('Пользователь не был найден'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id пользователя'));
        return;
      }
      next(e);
    });
};

const getUsers = (req, res, next) => {
  User.find()
    .orFail(() => {
      next(ApiError.NotFound('Пользователи не были найдены'));
    })
    .then((users) => res.send(users))
    .catch((e) => {
      next(e);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(ApiError.NotFound('Пользователь с данным id не найден'));
    })
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id пользователя'));
        return;
      }
      next(e);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(ApiError.NotFound('Пользователь с данным id не найден'));
    })
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.errors) {
        next(ApiError.BadRequest(Object.values(e.errors)[0].message));
      }
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id пользователя'));
        return;
      }
      next(e);
    });
};

const updateAvatar = (req, res, next) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      next(ApiError.NotFound('Пользователь с данным id не найден'));
    })
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ApiError.BadRequest('Некорректный id пользователя'));
        return;
      }
      if (e.errors) {
        next(ApiError.BadRequest(Object.values(e.errors)[0].message));
      }
      next(e);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUserInfo,
};
