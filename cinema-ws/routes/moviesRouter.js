const express = require('express')

const moviesController = require('../controllers/moviesController')
const authMiddleware = require('../middlewares/authMiddlewares')

const router = express.Router()

router.get('/', authMiddleware.checkPermissions("View Movies"), moviesController.getAllMovies)
router.post('/', authMiddleware.checkPermissions("Create Movies"), moviesController.addMovie)
router.patch('/:movieId', moviesController.updateMovie)
router.delete('/:movieId', moviesController.deleteMovie)

module.exports = router

// "Delete Movies"