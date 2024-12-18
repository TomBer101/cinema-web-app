const dataUtils = require('../utils/wsUtils')
const AppError = require('../classes/appErrors')

let movieCache = [];
let cachePage = 0; // Track the current page of cached movies
const MOVIES_PER_PAGE = 50;
const MOVIES_PER_FETCH = 300;

// cache = [300]
//page = 2
// requestedIndex = 50 

// cache = [300]
// page = 8
// requestedIndex = 350


const getAllMovies = async (pageNumber) => {
    const requestedIndex = (pageNumber - 1) * MOVIES_PER_PAGE

    if (requestedIndex >= movieCache.length) { // index too high - out of range -> fetch more data
        try {
            const requestedPage = Math.floor(requestedIndex / MOVIES_PER_FETCH) + 1
            const {movies} = await dataUtils.getData('movies', 300, requestedPage)

            const transformedMovies = movies.map(({_id, ...rest}) => ({
                ...rest,
                id: _id,
            }))
            movieCache = [...movieCache, ...transformedMovies]
        } catch (err) {
            console.error('Error fetching movies');
            throw new AppError.AppError('Error fetching movies', 500)
        }
    } 
    const slice = movieCache.slice(requestedIndex, requestedIndex + MOVIES_PER_PAGE)

    return slice

}

const addMovie = async (movieInfo) => {
    try {
        const res = await dataUtils.postData('movies', movieInfo)
        return res
    } catch (err) {
        console.error('Error post movie: ', err);
        //throw new AppError.AppError('Error fetching movies', 500)
        throw err
    }
}

const updateMovie = async (movieId, newData) => {
    try {
        const res = await dataUtils.patchData('movies', movieId, newData)
        return res
    } catch (err) {
        console.error(`Error updating movie: `, err);
        throw new AppError('Internal server error', 500)
    }

}

const deleteMovie = async (movieId) => {
    movieCache = movieCache.filter(movie => movie.id !== movieId)

    try {
        const res = await dataUtils.deleteData('movies', movieId)
        return res
    } catch (err) {
        console.error(`Error updating movie: `, err);
        throw new AppError('Internal server error', 500)
    }
}



module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie
}