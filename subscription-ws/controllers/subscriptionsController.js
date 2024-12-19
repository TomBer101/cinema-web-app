const subscriptionService = require('../services/subscriptionService')


const deleteSubscription = async (res, res) => {
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

module.exports = { 
    deleteSubscription
}