const axios = require('axios')

const URL = "https://api.tvmaze.com/shows"

const populateMovies = async () => {
    const {data: movies} = await axios.get(URL)
    return movies.map(movie => ({
        ...movie, 
        image: movie.image.medium
    }))
}

module.exports = {
    populateMovies,
}