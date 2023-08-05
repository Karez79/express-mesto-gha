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

    res.status(200).send({ token });
  }).catch((e) => {
    next(e);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    next(ApiError.Unauthorized('Не указан email'));
  }

  if (!password) {
    next(ApiError.Unauthorized('Не указан пароль'));
  }

  UserService.login(email, password).then((token) => {
    res.cookie('accessToken', token, {
      maxAge: ms('7d'),
      httpOnly: true,
    });

    res.status(200).send({ token });
  }).catch((e) => {
    next(e);
  });
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(ApiError.NotFound('Пользователь не был найден'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

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
    .catch(() => {
      next(ApiError.BadRequest('Некорректные данные или id пользователя'));
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
  login,
  getCurrentUserInfo,
};
