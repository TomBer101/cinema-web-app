const moviesService = require('../services/moviesServices')

// TODO: 
// 1. Add a sub query option - such as fetching only cartain feilds => add a feilds query param
// 2. Add a sub query - by name => add a name query
const getAllMovies = async (req, res) => {
    try {
        const page = req.query.page || 1
        const {fields} = req.query || undefined
        const movies = await moviesService.getAllMovies(page, fields)

        res.status(200).json({movies})
    } catch (err) {
        res.status(500).json({err})
    }
}

const getAll = async (req, res) => {
    try {
        const movies = await moviesService.getAll()
        res.status(200).json({movies})
    } catch (err) {
        res.status(500).json({err})
    }
}

const addMovie = async (req, res) => {
    try {
        const result = await moviesService.addMovie(req.body)

        res.status(result.status).json(result.data)
    } catch (err) {
        console.error('Error adding movie: ', err);
        res.status(err.status).json({message: res.message})        
    }
}

const updateMovie = async (req, res) => {
    const {movieId} = req.params

    try {
        const {data} = req.body
        const result = await moviesService.updateMovie(movieId, data);
        
        if (result.status === 200) {
            res.status(200).json({message: `Movie ${movieId} was updated`,
            movie: result.data
            })
        }

        else {
            res.status(500).json({message: 'Error updaing movie: ', movieId})
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

        if (result.status === 200) {
            res.status(200).json({message: `Movie ${movieId} was deleted`})
        }
    } catch (err) {
        res.status(err.status).json({message: err.message})
    }
}

const getMovie = async (req, res) => {
    const {movieId} = req.params

    try {
        const movie = await moviesService.getMovieById(movieId)
        res.status(200).json({movie})
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    getAll
}