const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.NODE_ENV === 'production' ? `${process.env.JWT_SECRET}` : 'dev-secret';

function getUser(id, res, next) {
  User.findById(id)
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NODE_ENV === 'production' ? `${process.env.NOT_FOUND_ERROR}` : 'NotFound';
      next(err);
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  getUser(req.params.id, res, next);
};

const getUserInfo = (req, res, next) => {
  getUser(req.user._id, res, next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res
        .status(201)
        .send(user.toJSON());
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    ({ name: req.body.name, about: req.body.about }),
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NODE_ENV === 'production' ? `${process.env.NOT_FOUND_ERROR}` : 'NotFound';
      next(err);
    })
    .then((newUser) => res.status(200).send(newUser))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, ({
    avatar: req.body.avatar,
  }), {
    new: true, runValidators: true,
  })
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NODE_ENV === 'production' ? `${process.env.NOT_FOUND_ERROR}` : 'NotFound';
      next(err);
    })
    .then((newUser) => res.status(200).send(newUser))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      const err = new Error();
      err.name = process.env.NODE_ENV === 'production' ? `${process.env.AUTH_ERROR}` : 'AuthError';
      next(err);
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isUserFind) => {
          if (isUserFind) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, secret);
            res.status(200)
              .cookie('jwt', jwt, {
                maxAge: 360000 * 24 * 7,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
              })
              .send(user);
          } else {
            const err = new Error();
            err.name = process.env.NODE_ENV === 'production' ? `${process.env.AUTH_ERROR}` : 'AuthError';
            next(err);
          }
        });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res
    .clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })
    .status(200)
    .send({ message: 'Выход' })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserInfo,
  logout,
};
