const moviesService = require('../services/moviesServices')

const getAllMovies = async (req, res) => {
    try {
        const page = req.params.page || 1
        const movies = await moviesService.getAllMovies(page)

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

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie
}