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


const getAllMovies = async (pageNumber, feilds) => {
    const requestedIndex = (pageNumber - 1) * MOVIES_PER_PAGE

    try {

        if (feilds) {
            let moviesProjection = await getMoviesFeilds(feilds, requestedIndex)
            moviesProjection = moviesProjection.map(({_id, ...rest}) => ({...rest, id: _id}))

            return moviesProjection
        } else {
            if (requestedIndex >= movieCache.length) {
                const requestedPage = Math.floor(requestedIndex / MOVIES_PER_FETCH) + 1
                const { movies } = await dataUtils.getData('movies', 300, requestedPage)

                const transformedMovies = movies.map(({ _id, ...rest }) => ({
                    ...rest,
                    id: _id,
                }))
                movieCache = [...movieCache, ...transformedMovies]
            }

            const slice = movieCache.slice(requestedIndex, requestedIndex + MOVIES_PER_PAGE)
            return slice

        }

    } catch (err) {
            console.error('Error fetching movies');
            throw new AppError.AppError('Error fetching movies', 500)
        }


}

const getMoviesFeilds = async (feilds) => {
    //const cachedNames = movieCache.map(movie => movie.name)

    try {
        const skip = Math.floor(movieCache.length / MOVIES_PER_FETCH)
        let { movies: fetchedMovies } = await dataUtils.getData('movies',300, 0, feilds)

        //fetchedMovies = fetchedMovies.map(movie => movie.name)
        //const combined = Array.from(new Set([...cachedNames, ...fetchedMovies]))
        return fetchedMovies
    } catch (err) {
        console.error('Error get by feilds: ', err)
        throw err
    }
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