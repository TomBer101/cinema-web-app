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

const deleteSubcriptionByMemeberId = async (memberId) => {
    try {
        const res = await dataUtils.deleteData('subscriptions', memberId)
        return {
            status: 200,
            message: 'Memeber data was deleted'
        }
    } catch (err) {
        console.error('Error deleting subscription: ', err);
        throw err
    }
}

module.exports = {
    addNewSubscription,
    deleteSubcriptionByMemeberId
}