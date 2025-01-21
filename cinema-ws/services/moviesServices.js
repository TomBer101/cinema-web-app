const dataUtils = require('../utils/wsUtils')
const AppError = require('../classes/appErrors')


const MOVIES_PER_PAGE = 50;
const MOVIES_PER_FETCH = 300;

const cachedMovieIds = new Set();
let movieCache = [];
let cachePage = 0; 
let totalCount = 0;


const getAllMovies = async (pageNumber, feilds, name) => {
    const requestedIndex = (pageNumber - 1) * MOVIES_PER_PAGE

    try {

        if (feilds) {
            let moviesProjection = await getMoviesFeilds(feilds, requestedIndex)
            moviesProjection = moviesProjection.map(({_id, members, ...rest}) => {

                return ({...rest, id: _id})
            })

            return {moviesProjection, hasMore: false}
        } else if (name) {
            const formatedName = name.toLowerCase()
            const movies = movieCache.filter(movie => {
                const movieName = movie.name.toLowerCase()
                return movieName.includes(formatedName)
            })

            return movies
        } else {
            if (requestedIndex >= movieCache.length) {
                const requestedPage = Math.floor(requestedIndex / MOVIES_PER_FETCH) + 1
                const { movies, totalCount } = await dataUtils.getData('movies', 300, requestedPage)

                const transformedMovies = movies.map(({ _id, members, ...rest }) => {
                    cachedMovieIds.add(_id)

                    const transformedMembers = members.map(({_id, ...restMem}) => ({id: _id, ...restMem}))

                    return ({
                    ...rest,
                    members: transformedMembers,
                    id: _id,
                    })
            }
            )

                movieCache = [...movieCache, ...transformedMovies]
                cachePage = requestedPage
            }

            const slice = movieCache.slice(requestedIndex, requestedIndex + MOVIES_PER_PAGE)
            const hasMore = movieCache.length > requestedIndex + MOVIES_PER_PAGE ||
                (cachePage * MOVIES_PER_FETCH < totalCount); // Check if there's potentially more data in Server B

            
            return {data: slice, hasMore}
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

const getMovieById = async (movieId) => {
    let movie = movieCache.find(movie => movie.id === movieId)
    if (movie) return movie

    try {
        movie = await dataUtils.getData('movies', movieId)
        return movie
    } catch (err) {
        console.error('Error Get Movie By ID: ', err);
        throw new AppError('Internal App Server', 500)
    }

}

const invalidateCache = (subscription) => {
    for (let i = 0; i < movieCache.length; i++) {
        if (movieCache[i].id === subscription.movieId) {
            movieCache[i].members = [...movieCache[i].members, {id: subscription.memberId, watchedDate: subscription.date, name: subscription.memberName}] //? [...membersCache[i].movies] : [membersCache[i].movies].push({name: subscription.movieName, watchDate: subscription.watchDate, _id: subscription._id})
            break
        }
    }
}

module.exports = {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    invalidateCache
}