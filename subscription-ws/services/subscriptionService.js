const Subscription = require('../models/subscriptionModel')
const AppError = require('../classes/appError')
const Member = require('../models/memberModel')

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

const getAllMembers = async (page, limit) => {
    const skip = (page - 1) * limit;

    try {
        const members = await Member.aggregate([
            { $match: {} },            
            {$skip: skip},
            {$limit: limit},
            {
                $lookup: {
                    from: 'subscriptions',
                    localField: '_id',
                    foreignField: 'members.memberId',
                    as: 'subscriptions'
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: 'subscriptions.movies.movieId',
                    foreignField: '_id',
                    as: 'movies'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    email: {$first: '$email'},
                    city: {$first: '$city'},
                    movies: {
                        $push: {
                            _id: '$movies._id',
                            name: '$movies.name',
                            watchDate: '$subscriptions.movies.date'
                        }
                    }
                }
            }

        ])

        return members
    } catch (err) {
        console.error('Error fetching all members: ', err);
        throw new AppError('InternalServer Error', 500)
        
    }
}

module.exports = {
    addOrUpdatesubscription
}