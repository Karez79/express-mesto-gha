const tokenService = require('../services/token');
const ApiError = require('../exceptions/api-error');

module.exports = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      next(ApiError.Unauthorized('Токен отсутствует в cookie'));
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      next(ApiError.Unauthorized('Некорректный токен'));
    }

    req.user = userData;

    next();
  } catch (e) {
    next(ApiError.Unauthorized('Некорректный токен'));
  }
};
