import axios from 'axios';
import { deleteData, fetchData, patchData, postData } from '../utils/dataUtils'
import { formatDate } from '../utils/formatting'


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
                "members": [
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

export const fetchMoviesSimple = async () => {
    try {
        const {data} = await axios.get('http://localhost:8080/api/movies/all')
        data.movies.movies.forEach(movie => {
            movie.premiered = formatDate(movie.premiered)
        });

        return data.movies
    } catch (err) {
        console.error('ERror: ', err);
        return {hasMore: false, data: []};
    }
}

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
    movie.premiered = formatDate(movie.premiered)
    return movie
}