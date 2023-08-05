const { Schema, model } = require('mongoose');
const validator = require('validator');
const avatarUrlRegexp = require('../services/avatarUrlRegexp');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Не указан email'],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: (props) => `${props.value} - некорректный email`,
      },
    },
    password: {
      required: [true, 'Не указан пароль'],
      type: String,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: false,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
      required: false,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (avatar) => avatarUrlRegexp.test(avatar),
        message: (props) => `${props.value} - некорректная ссылка`,
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('user', userSchema);
