const dataUtils = require('../utils/wsUtils')
const AppError = require('../classes/appErrors')

const addNewSubscription = async (subscriptionData) => {
    try {
        const res = await dataUtils.postData('subscription', subscriptionData)
        return res
    } catch (err) {
        console.error("Error post subscription");
        throw err
    }
}

const updateSubscription = async (subscriptionId, addedMovie) => {
    
}

module.exports = {
    addNewSubscription
}