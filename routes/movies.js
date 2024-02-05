const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { movieValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', movieValidation, createMovie);

router.delete('/movies/:movieId', movieIdValidation, deleteMovieById);

module.exports = router;
