class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = `Отсутствуют права доступа: ${err.message}, cookies: ${err.cookies}`;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
