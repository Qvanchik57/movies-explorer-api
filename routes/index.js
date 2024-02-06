const routes = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { authValidation, regValidation } = require('../middlewares/validation');

routes.post('/signin', authValidation, login);
routes.post('/signup', regValidation, createUser);

routes.use('/', auth, usersRouter);
routes.use('/', auth, moviesRouter);

module.exports = routes;
