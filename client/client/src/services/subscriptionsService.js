import { fetchData } from "../utils/dataUtils"

export const fetchSubscriptions = async (page) => {
    try {
        const subscriptions = await fetchData('/subscriptions', page)
        return subscriptions
    } catch (err) {
        console.error('Error fetching subscriptions: ', err);
        throw new Error('Test error')
    }
}