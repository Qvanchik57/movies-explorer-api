require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/notAuthError');
const { errorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError(errorMessage.notAuthError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new NotAuthError(errorMessage.notAuthError);
  }

  req.user = payload;

  next();
};
