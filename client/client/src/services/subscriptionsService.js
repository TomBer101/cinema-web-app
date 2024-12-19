import { fetchData } from "../utils/dataUtils"

export const fetchSubscriptions = async (page) => {
    try {
        const {members} = await fetchData('/subscriptions', page)
        return members
    } catch (err) {
        console.error('Error fetching subscriptions: ', err);
        if (err.status === 401) {
            throw new Error('Unauthorized! Please login again.')
        } else {
            throw new Error('Unknown Error!')
        }
    }
}

