import { deleteData, fetchData, patchData, postData } from '../utils/dataUtils'

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const formattedDate = formatDate('2014-09-24T00:00:00.000Z');
console.log(formattedDate); // Output: 24/09/2014


export const fetchMovies = async (page) => {
    try {
        const {movies}  = await fetchData('/movies', page)
        movies.data.forEach(movie => {
            movie.premiered = formatDate(movie.premiered)
        });

        return movies
    } catch (err) {
        console.error('Error fetching movies: ', err);
        return {
            hasMore: false,
            data:[
            {
                "_id" : "66e583f7d43006e1685edf39",
                "name" : "Arrow1",
                "geners" : [
                    "Drama", "Comedy", "SiFi"
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ("2012-10-10"),
                "subscriptions": [
                    {
                        "user": "user1",
                        "date": "2020-01-01"
                    },
                    {
                        "user": "user1",
                        "date": "2020-01-01"
                    },
                    {
                        "user": "user1",
                        "date": "2020-01-01"
                    },
                    {
                        "user": "user1",
                        "date": "2020-01-01"
                    }
                ]
            },
            {
                "_id" : "66e583f7d43006e1685edf39",
                "name" : "Arrow2",
                "geners" : [
            
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ("2012-10-10")
            },
            {
                "_id" : "66e583f7d43006e1685edf39",
                "name" : "Arrow3",
                "geners" : [
            
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ("2012-10-10")
            }
        ]}
    }
    
};

export const addMovie = async (newMovie) => {
    const response = await postData('/movies', newMovie)
    return response
}

export const updateMovie = async (movieId, updatedInfo) => {
    try {
        const {data: res} = await patchData(`/movies/${movieId}`, updatedInfo)
        return res
    } catch (err) {
        throw err;
    }
};

export const deleteMovie = async (movieId) => {
    const response = await deleteData('/movies', {params: {movieId}})
}

export const getMoviesName = async (page, query) => {
    const {movies} = await fetchData('/movies', page, query)
    return movies
}

export const getMovieById = async (movieId) => {
    const {movie} = await fetchData(`/movies/${movieId}`)
    return movie
}