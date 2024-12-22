const subscriptionService = require('../services/subscriptionService')


const deleteSubscription = async (req, res) => {
    const {memberId} = req.params

    try {
        const result = await subscriptionService.deleteSubscription(memberId);
        if (result.success) {
            res.statuc(200).json({message: result.message})
        }

        else {
            res.status(301).json({message: result.message})
        }
    } catch (err) {
        res.status(err.status).json({message: err.message})
    }
}

const createSubscriptions = async (req, res) => {
    const {memberId} = req.params
    const {id: movieId, date} = req.body

    try {
        const subscription = await subscriptionService.addOrUpdatesubscription(memberId, movieId, date)
        res.status(200).json(subscription)
    } catch (err) {
        console.error(err);
        res.status(err.status).json({ message: err.message });        
    }
}

module.exports = { 
    deleteSubscription,
    createSubscriptions
}