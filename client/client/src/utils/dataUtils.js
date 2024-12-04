import axios from 'axios'


const serverUrl = 'http://localhost:8080/api'

const apiClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export const postData = async (route, data) => {
    try {
        const response = await apiClient.post(route, data);
        return {
            data: response.data,
            statusCode: response.status
        }
    } catch (err) {
        console.error(`POST request to ${route} failed: `, err)
        throw err
    }
}

export const patchData = async (route, data) => {
    try {
        const response = await apiClient.patch(route, data)
        return {
            data: response.data,
            statusCode: response.status
        }
    } catch (err) {
        console.error(`Patch request to ${route} failed: `, err);
        throw err
    }
}

export const deleteData = async (route, configs) => {
    try {
        const response = await apiClient.delete(route, configs)
        return {
            data: response.data,
            statusCode: response.status
        }
    } catch (err) {
        console.error(`DELETE equest to ${route} failed: `, err);
        return err
    }
}

export const fetchData = async (route, page = 1, query) => {
    try {
        const {data, status} = await apiClient.get(route, {
            params: {
                page,
                ...query
            }
        })

        if (status === 200) {return data}
        else {throw new Error(`Error fetching ${route}`)}
        
    } catch (err) {
        console.error(`Get request to ${route}: `, err);
        throw err
    }
}



