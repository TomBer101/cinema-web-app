const subscriptionService = require('../services/subscriptionService')

const addSubscription = async (req, res) => {
    const memeberId = req.params
    const subscriptionData = req.body

    const data = {
        memeberId,
        ...subscriptionData
    }

    try {
        const result = await subscriptionService.addNewSubscription(data)
        res.status(result.status).json({message: res.message})
    } catch (err) {
        console.error('Error adding subscription: ', err);
        res.status(err.status).json({message: res.message})
    }
}

const getAllSubscriptions = async (req, res) => {
    res.redirect('/api/members')
}



module.exports = {
    addSubscription,
    getAllSubscriptions
}