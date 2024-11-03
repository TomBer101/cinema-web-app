const axios = require('axios')
const { AppError } = require('../classes/appErrors')

const BASE_URL = 'http://localhost:8000/api/'

const getData = async (route, limit = undefined, page = undefined) => {
    try {
        const {data} = await axios.get(BASE_URL + route, {
            params: {
                limit: limit,
                page
            }
        })

        return data
    } catch (err) {
        console.error('Error fetching data from ', route, 'Error: ', err);
        throw new Error('Internal Server Error')
    }
}

const postData = async (route, data) => {
    try {
        const res = await axios.post(BASE_URL + route, data)
        return res
    } catch (err) {
        console.error(('Error posting new data: ', err));
        throw err
    }
}

const patchData = async (route, id, data) => {
    try {
        const res = await axios.patch(`${route}/${id}`, data, {
            baseURL: BASE_URL,
        })

        return res;
    } catch (err) {
        console.error(`Error patching data to: ${route}. ERROR: `, err);
        throw err
    }
}

const deleteData = async (route, id) => {
    try {
        const res = await axios.delete(`${route}/${id}`, {
            baseURL: BASE_URL
        })
        
        return res
    } catch (err) {
        console.error(`Error deleting data to: ${route}. ERROR: `, err);
        throw err
    }
}

module.exports = {
    getData,
    postData,
    patchData,
    deleteData
}