require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const GOOD_REQ = 200;
const CREATE_REQ = 201;

const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

module.exports.getThisUser = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      res.status(GOOD_REQ).send(user);
    })
    .catch(next);
};

module.exports.patchUser = async (req, res, next) => {
  const { email, name } = req.body;
  await Users.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.status(GOOD_REQ).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(CREATE_REQ).send({
      email, name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      } if (err.code === 11000) {
        next(new ConflictError('Пользователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
