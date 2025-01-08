const express = require('express')
const moviesController = require('../controllers/moviesController')
const authMiddlware = require('../middlewares/authMiddlewares')

const router = express.Router()

router.get('/', moviesController.getAllMovies)
router.get('/all', moviesController.getMovies)
router.get('/:movieId', moviesController.getMovieById)
router.post('/', moviesController.addMovie)
router.patch('/:movieId', moviesController.updateMovie)
router.delete('/:movieId', moviesController.deleteMovie)

module.exports = router