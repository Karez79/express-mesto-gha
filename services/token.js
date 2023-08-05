const jwt = require('jsonwebtoken');

class TokenService {
  static validateAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  }

  static generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }
}

module.exports = TokenService;
