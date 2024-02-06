const Movies = require('../models/movie');

const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ForeignError = require('../errors/foreignError');
const { statusReq, errorMessage } = require('../utils/constants');

const GOOD_REQ = statusReq.goodReq;
const CREATE_REQ = statusReq.createReq;

module.exports.getMovies = async (req, res, next) => {
  await Movies.find({ owner: req.user._id })
    .then((movies) => res.status(GOOD_REQ).send(movies))
    .catch(next);
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  await Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATE_REQ).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessage.validationCreateMovieError));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = async (req, res, next) => {
  await Movies.findByIdAndDelete(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessage.notFoundMovieError);
      }
      if (movie.owner.toString() === req.user._id) {
        res.status(GOOD_REQ).send(movie);
      } else {
        next(new ForeignError(errorMessage.foreignError));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(errorMessage.validationDeleteMovieError));
      } else {
        next(err);
      }
    });
};
