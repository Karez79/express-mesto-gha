const bcrypt = require('bcrypt');
const User = require('../models/user');
const tokenService = require('./token');
const ApiError = require('../exceptions/api-error');

class UserService {
  static registration(name, about, avatar, email, password) {
    if (!password) {
      throw ApiError.BadRequest('Указан неверный пароль');
    }

    return bcrypt.hash(password, 2)
      .then((hashedPass) => User
        .create({
          name,
          about,
          avatar,
          email,
          password: hashedPass,
        })
        .then((user) => tokenService.generateToken({ _id: user._id }))
        .then((token) => token))
      .catch((e) => {
        if (e.code === 11000) {
          throw ApiError.Conflict('Пользователь с таким email уже существует');
        }
        if (e.errors) {
          throw ApiError.BadRequest(Object.values(e.errors)[0].message);
        }
        throw ApiError.InnerError(e.message);
      });
  }

  static login(email, password) {
    return User
      .findOne({ email })
      .select('+password')
      .orFail(() => {
        throw ApiError.Unauthorized(`Пользователь с почтой ${email} не был найден`);
      })
      .then((user) => bcrypt
        .compare(password, user.password)
        .then((isPasswordsEqual) => {
          if (!isPasswordsEqual) {
            throw ApiError.Unauthorized('Введен неверный пароль');
          }
          return tokenService.generateToken({ _id: user._id });
        }));
  }
}

module.exports = UserService;
