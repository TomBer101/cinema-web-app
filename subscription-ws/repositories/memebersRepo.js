const axios = require('axios')

const URL = "https://jsonplaceholder.typicode.com/users"

const populateMemebers = () => {
    const response =  axios.get(URL)
    return response
}

module.exports = {
    populateMemebers
}