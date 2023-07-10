class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = `Отсутствуют права доступа: ${err.message}`;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
