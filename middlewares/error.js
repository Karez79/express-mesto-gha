const ApiError = require('../exceptions/api-error');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }

  next();
};
