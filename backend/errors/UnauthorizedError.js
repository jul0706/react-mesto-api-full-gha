class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = `Отсутствуют права доступа: ${err.message}, cookies: ${JSON.stringify(err.cookies)}`;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
