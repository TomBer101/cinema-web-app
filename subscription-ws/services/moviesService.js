const Movie = require('../models/movieModel')
const AppError = require('../classes/appError')


const getAllMovies = async (page, limit, name) => { // TODO: add watchers data
    const skip = (page - 1) * limit
    try {
        const results = await Movie.aggregate([
            {
                $facet: {
                    data: [
                        {
                            $match: name? {name: {$regex: new RegExp(name, 'i')}} : {}
                        },
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
                        
                        {$sort: {name: 1}},
                        {$skip: skip},
                        {$limit: limit + 1},
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
            
        ]);

        const movies = results[0].data
        const totalCount = results[0].totalCount[0]?.count || 0

        
        return {
            movies,
            totalCount
        };
        
    }catch (err) {
        console.error('Error fetching all movies: ', err);
        throw new AppError('Internal Server Error', 500)
    }
}

const addMovie = async ({name, genres, imageUrl, premiered}) => {
    try {
        const exsitedMovie = await Movie.findOne({name})

        if (exsitedMovie) {
            throw new AppError('Moview name is in use', 400)
        }

        const newMovie = new Movie({
            name,
            geners: genres,
            image: imageUrl,
            premiered: premiered
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

        if (Array.isArray(updatedData.genres)) {
            exsitedMovie.genres = updatedData.genres;
            exsitedMovie.markModified('genres');
        }
        
        exsitedMovie.image = updatedData.image || exsitedMovie.image 
        exsitedMovie.name = updatedData.name || exsitedMovie.name 

        exsitedMovie.premiered = updatedData.premiered || exsitedMovie.premiered

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

const getMoviesProjection = async (projection, skip = 0) => {
    try {
        const projectedMovies = await Movie.find({}, projection, {skip});
        return projectedMovies;
    } catch (err) {
        console.error('Error getting movies names');
        throw new AppError('Internal Server Error', 500);
    }
}

const getMovieById = async (movieId) => {
    try {
        const movie = Movie.findById(movieId)

        if (!movie) throw new AppError(`Movie ${movieId} was not found.`, 403)
        return movie
    } catch (err) {
        console.error('ERror getting movie by id: ', err);

        if (err instanceof AppError) throw err
        throw new AppError('Internal Server Error', 500)
    }
}

const getMoviesByName = async (name) => {
    try {
        const regex = new RegExp(name, 'i');
        const movies = await Movie.find({name: regex}) 
        return movies
    } catch (err) {
        console.error('Error getting movie by name: ', err);
        throw new AppError('Internal Server Error', 500);
        
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getMoviesProjection,
    getMoviesByName
}