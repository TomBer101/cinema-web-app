const Movie = require('../models/movieModel')
const AppError = require('../classes/appError')


const getAllMovies = async (page, limit) => { // TODO: add watchers data
    const skip = (page - 1) * limit
    try {
        const movies = await Movie.aggregate([
            {
                $match: {}
            },
            {$skip: skip},
            {$limit: limit},
            // Step 1: Lookup subscriptions for each movie to get all subscriptions with matching movies
            {
                $lookup: {
                    from: 'subscriptions',
                    localField: '_id',
                    foreignField: 'movies.movieId',
                    as: 'subscriptions'
                }
            },
            // Step 2: Unwind subscriptions array to work with each individual subscription entry
            {
                $unwind: {
                    path: '$subscriptions',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 3: Unwind movies array within each subscription to access individual movie entries
            {
                $unwind: {
                    path: '$subscriptions.movies',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 4: Match only movies within the subscription that correspond to the current movie ID
            {
                $match: {
                    $or: [
                        {$expr: { $eq: ['$subscriptions.movies.movieId', '$_id'] }},
                        {'subscriptions': null}
                    ]
                }
            },
            // Step 5: Lookup member data for each subscription
            {
                $lookup: {
                    from: 'members',
                    localField: 'subscriptions.memberId',
                    foreignField: '_id',
                    as: 'member'
                }
            },
            // Step 6: Unwind member data to link each subscription to a single member
            {
                $unwind: {
                    path: '$member',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 7: Group back by movie ID, accumulating watcher data in `members`
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    genres: { $first: '$genres' },
                    image: { $first: '$image' },
                    premiered: { $first: '$premiered' },
                    members: {
                        $push: {
                            _id: '$member._id',
                            name: '$member.name',
                            watchedDate: '$subscriptions.movies.date'
                        }
                    }
                }
            },
            // Step 8: Filter members to exclude empty data and retain all movies
            {
                $addFields: {
                    members: {
                        $cond: {
                            if: { $eq: ['$members', [{}]] }, // If the movies array contains an empty object
                            then: [], // Replace with an empty array
                            else: '$members' // Otherwise, keep the movies array as is
                        }
                        
                    }
                }
            },
            
        ]);
        

        return movies
    }catch (err) {
        console.error('Error fetching all movies: ', err);
        throw new AppError('Internal Server Error', 500)
    }
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