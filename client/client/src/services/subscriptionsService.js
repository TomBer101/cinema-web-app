import { fetchData, postData } from "../utils/dataUtils"

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

export const addSubscription = async (newSubscription) => {
    try {
        const {data: subscription} = await postData(`subscriptions/${newSubscription.memberId}`, newSubscription.subscription)
        return subscription
    } catch (err) {
        if (err.status === 401) {
            throw new Error('Unauthorized! Please login again.')
        } else {
            console.log('Error add subscription: ', err);
            throw new Error('Unknown Error!')
        }
    }
}

