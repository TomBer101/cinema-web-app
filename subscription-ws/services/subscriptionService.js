const Subscription = require('../models/subscriptionModel')
const AppError = require('../classes/appError')

const addOrUpdatesubscription = async ({memberId, movieId, date}) => {
    try {
        let userSubscriptions = await Subscription.findOne({memberId})

        if (userSubscriptions) {
            userSubscriptions.movies.push({
                movieId,
                date: new Date()
            })

            await userSubscriptions.save()
        } else {
            userSubscriptions = new Subscription({
                memberId,
                movies: [
                    {
                        movieId,
                        date: new Date()
                    }
                ]
            });

            await userSubscriptions.save()
        }

        return userSubscriptions
    } catch (err) {
        console.error("Error adding subscription: ", err);
        throw err
    }
}

module.exports = {
    addOrUpdatesubscription
}