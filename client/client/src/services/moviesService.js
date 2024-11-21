import { deleteData, fetchData, patchData, postData } from '../utils/dataUtils'

export const fetchMovies = async (page) => {
    try {
        const {movies}  = await fetchData('/movies', page)
    return movies
    } catch (err) {
        console.error('Error fetching movies: ', err);
        return [
            {
                "_id" : ObjectId("66e583f7d43006e1685edf39"),
                "name" : "Arrow",
                "geners" : [
                    "Drama", "Comedy", "SiFi"
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ISODate("2012-10-10T00:00:00.000+0000"),
                "__v" : NumberInt(0)
            },
            {
                "_id" : ObjectId("66e583f7d43006e1685edf39"),
                "name" : "Arrow",
                "geners" : [
            
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ISODate("2012-10-10T00:00:00.000+0000"),
                "__v" : NumberInt(0)
            },
            {
                "_id" : ObjectId("66e583f7d43006e1685edf39"),
                "name" : "Arrow",
                "geners" : [
            
                ],
                "image" : "https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg",
                "premiered" : ISODate("2012-10-10T00:00:00.000+0000"),
                "__v" : NumberInt(0)
            }
        ]
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