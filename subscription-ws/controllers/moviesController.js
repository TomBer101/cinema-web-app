const moviesService = require('../services/moviesService')

const getAllMovies = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 300

    try {
        const movies = await moviesService.getAllMovies(page, limit)
        res.status(200).json({movies})
    } catch (err) {
        console.error('Error in subscription server - get all movies: ', err);
        
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const addMovie = async (req, res) => {
    const movieInfo = req.body

    try {
        const newMovie = await moviesService.addMovie(movieInfo)
        res.status(200).json({newMovie})
    } catch (err) {
        console.error('Error in subscription server - add movies: ', err);
        res.status(err.status).json({message: err.message})
    }
}

const updateMovie = async (req, res) => {
    const {movieId} = req.params 

    try {
        const data = req.body
        const result = await moviesService.updateMovie(movieId, data)

        if (result) {
            res.status(200).json({updatedMovie: result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    } catch (err) {
        console.error('Error updaing movie: ', err);
        res.status(err.status).json({message: err.message})
    }
}

const deleteMovie = async (req, res) => {
    const {movieId} = req.params

    try {
        const result = await moviesService.deleteMovie(movieId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: 'Error deleting movie ' + movieId})
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie
}