const jsonWebToken = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'production' ? `${process.env.JWT_SECRET}` : 'dev-secret';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jsonWebToken.verify(token, secret);
  } catch (err) {
    err.name = process.env.NODE_ENV === 'production' ? `${process.env.AUTH_ERROR}` : 'AuthError';
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
