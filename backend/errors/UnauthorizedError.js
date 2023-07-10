class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Отсутствуют права доступа';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
