const jwt = require('jsonwebtoken');

class TokenService {
  static validateAccessToken(token) {
    return jwt.verify(token, 'elhcidfu');
  }

  static generateToken(payload) {
    const accessToken = jwt.sign(payload, 'elhcidfu', {
      expiresIn: '7d',
    });

    return accessToken;
  }
}

module.exports = TokenService;
