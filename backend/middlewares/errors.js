const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  IncorrectIdError,
  ServerError,
  NotFoundError,
  ValidationError,
  DublicateUserError,
  WrongAuthError,
} = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  let error;
  switch (err.name) {
    case process.env.NODE_ENV === 'production' ? `${process.env.UNAUTHORIZED_ERROR}` : 'Unauthorized':
      error = new UnauthorizedError(err);
      break;
    case process.env.NODE_ENV === 'production' ? `${process.env.AUTH_ERROR}` : 'AuthError':
      error = new WrongAuthError(err);
      break;
    case process.env.NODE_ENV === 'production' ? `${process.env.NOT_FOUND_ERROR}` : 'NotFound':
      error = new NotFoundError(err);
      break;
    case process.env.NODE_ENV === 'production' ? `${process.env.CAST_ERROR}` : 'CastError':
      error = new IncorrectIdError(err);
      break;
    case process.env.NODE_ENV === 'production' ? `${process.env.VALIDATION_ERROR}` : 'ValidationError':
      error = new ValidationError(err);
      break;
    case process.env.NODE_ENV === 'production' ? `${process.env.MONGO_SERVER_ERROR}` : 'MongoServerError':
      error = new DublicateUserError(err);
      break;
    default:
      error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
