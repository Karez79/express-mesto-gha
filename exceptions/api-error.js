module.exports = class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static Unauthorized(message) {
    return new ApiError(401, message);
  }

  static Forbidden(message) {
    return new ApiError(403, message);
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }

  static Conflict(message) {
    return new ApiError(409, message);
  }

  static InnerError(message) {
    return new ApiError(500, message);
  }
};
