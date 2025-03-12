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
    console.log('addSubscription service called with:', newSubscription);
    try {
        const {data: subscription} = await postData(`subscriptions/${newSubscription.memberId}`, newSubscription.subscription)
        console.log('Subscription response:', subscription);
        return subscription
    } catch (err) {
        console.log('Error in addSubscription:', err);
        if (err.status === 401) {
            throw new Error('Unauthorized! Please login again.')
        } else {
            console.log('Error add subscription: ', err);
            throw new Error('Unknown Error!')
        }
    }
}

