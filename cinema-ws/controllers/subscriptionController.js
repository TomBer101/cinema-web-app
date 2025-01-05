const subscriptionService = require('../services/subscriptionService')
const membersService = require('../services/membersService')
const moviesService = require('../services/moviesServices')

const addSubscription = async (req, res) => {
    const {memberId} = req.params
    let subscriptionData = req.body

    subscriptionData = {
        memberId,
        ...subscriptionData
    }

    try {
        const {data: subscription, status} = await subscriptionService.addNewSubscription(subscriptionData)
        membersService.invalidateCache(subscription)
        moviesService.invalidateCache(subscription)
        res.status(status).json({...subscription, id: subscription._id || subscription.id})
    } catch (err) {
        console.error('Error adding subscription: ', err);
        res.status(err.status).json(data)
    }
}

const getAllSubscriptions = async (req, res) => {
    res.redirect('/api/members')
}

const deleteSubscription = async (req, res) => {
    const {memberId} = req.params

    try {
        const deletedSubscription = await subscriptionService.deleteSubcriptionByMemeberId(memberId)
        res.status(deletedSubscription.status).json({message: deletedSubscription.message})
    } catch (err) {
        console.error('Error deleting subscription: ', err);
        res.status(200).json({message: 'Couldnt delete member data'})        
    }
}



module.exports = {
    addSubscription,
    getAllSubscriptions,
    deleteSubscription
}