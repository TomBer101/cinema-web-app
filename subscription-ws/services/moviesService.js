const Movie = require('../models/movieModel')
const AppError = require('../classes/appError')


const getAllMovies = async (page, limit) => { // TODO: add watchers data
    const skip = (page - 1) * limit
    try {
        const movies = await Movie.aggregate([
            {
                $lookup: {
                    from: 'subscriptions',
                    let: {movieId: '$_id'},
                    pipeline: [

                    ]
                }
            }
        ])
    }

    // try {
    //     const movies = await Movie.find({})
    //                     .skip(skip)
    //                     .limit(limit)
    //     return movies
    // } catch (err) {
    //     console.error('Error fetching all movies: ', err);
    //     throw new AppError('Internal Server Error', 500)
    // }
}

const addMovie = async ({name, genres, imageUrl, premired}) => {
    try {
        const exsitedMovie = await Movie.findOne({name})

        if (exsitedMovie) {
            throw new AppError('Moview name is in use', 400)
        }

        const newMovie = new Movie({
            name,
            geners: genres,
            image: imageUrl,
            premiered: premired
        })

        await newMovie.save()
        return newMovie;

    } catch (err) {
        if (err instanceof AppError) {
            throw err
        } else {
            console.error('Error adding a movie: ', err);
            const er = new Error('Internal Server Error')
            er.statusCode = 500

            throw er
        }
    }
}

const updateMovie = async (movieId, updatedData) => {
    try {
        const exsitedMovie = await Movie.findById(movieId)

        if (!exsitedMovie) {
            throw new AppError(`Movie ${movieId} was not found.`)
        }

        exsitedMovie.geners = updatedData.genres || exsitedMovie.geners 
        exsitedMovie.premiered = updatedData.premiered || exsitedMovie.premiered 
        exsitedMovie.image = updatedData.image || exsitedMovie.image 
        exsitedMovie.name = updatedData.name || exsitedMovie.name 

        const updatedMovie = await exsitedMovie.save()
        // const updatedMovie = await Movie.updateOne({_id: movieId}, updatedData)
        
        return updatedMovie
    } catch (err) {
        console.error('Error updating movie: ', err);
        throw new AppError('Internal Server Error', 500)
    }
}

const deleteMovie = async (movieId) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        
        if (!deletedMovie) {
            throw new Error('Movie not found');
        }

        return { success: true, message: 'Movie deleted successfully', movieId: deletedMovie._id };
    } catch (err) {
        console.error('Error deleting movie: ', err.message);
        throw new Error('Internal Server Error');
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
}