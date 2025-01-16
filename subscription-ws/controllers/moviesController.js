const moviesService = require('../services/moviesService')

const getAllMovies = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 300
    const {feilds, name} = req.query

    try {
        if (feilds) {
            const skip = (page - 1) * limit
            const projection = feilds.replace(',', '')
            const movies = await moviesService.getMoviesProjection(projection, skip)
            res.status(200).json({movies})
        } 
        // else if (name) {
        //     const movies = await moviesService.getMoviesByName(name)
        //     res.status(200).json({movies})
        // } 
        else {
            const result = await moviesService.getAllMovies(page, limit, name)
            res.status(200).json(result)
        }
        
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
    const {movieId} = req.query 

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

const getMovieById = async (req, res) => {
    const {movieId} = req.params

    try {
        const result = await moviesService.getMovieById(movieId)
        res.status(200).json(result)
    } catch (err) {
        res.status(err.status || res.statusCode).json({message: err.message})
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById
}