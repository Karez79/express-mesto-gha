const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Не указано поле name'],
    },
    link: {
      type: String,
      required: [true, 'Не указано поле link'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Не указано поле owner'],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('card', cardSchema);
