const Member = require('../models/memberModel')
const Subscription = require('../models/subscriptionModel')
const AppError = require('../classes/appError')

// TO DO: add caching?

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
                    foreignField: 'memberId',
                    as: 'subscriptions'
                }
            },
            {
                $unwind: {
                    path: '$subscriptions',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$subscriptions.movies',
                    preserveNullAndEmptyArrays: true
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
                $unwind: {
                    path: '$movies',
                    preserveNullAndEmptyArrays: true
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
            },
            {
                $addFields: {
                    movies: {
                        $cond: {
                            if: { $eq: ['$movies', [{}]] }, // If the movies array contains an empty object
                            then: [], // Replace with an empty array
                            else: '$movies' // Otherwise, keep the movies array as is
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

const addMember = async ({name, email, city}) => {
    try {
        const existedMember = await Member.findOne({email: email})

        if (existedMember) {
            throw new AppError('Email is already in use', 400)
        }

        const newMember = new Member({
            name,
            email,
            city
        })

        await newMember.save()
        return newMember
    } catch (err) {
        if (err instanceof AppError) throw err
        else {
            console.error('Error adding member: ', err);
            const er = new Error('Internal Server Error')
            err.staus = 500
            throw er
        }
    }
}

const updateMember = async (memberId, updatedData) => {
    try {
        const existedMember = await Member.findById(memberId)

        if (!existedMember) {
            throw new AppError(`Member ${memberId} was not found`, 400)
        }

        if (updatedData.email && updatedData.email !== existedMember.email) {
            const member = await Member.findOne({ email: updatedData.email })
            if (member) {
                throw new AppError(`The email ${email} is in use`, 404)
            }    
        }

        existedMember.name = updatedData.name || existedMember.name 
        existedMember.email = updatedData.email || existedMember.email 
        existedMember.city = updatedData.city || existedMember.city 

        const updatedMember = await existedMember.save()
        return updatedMember
    } catch (err) {
        if (err instanceof AppError) throw err
        else {
            console.error('Error adding member: ', err);
            const er = new Error('Internal Server Error')
            err.staus = 500
            throw er
        } 
    }
}

const deleteMember = async (memberId) => {
    try {
        const deletedMember = await Member.findByIdAndDelete(memberId)
        if (!deletedMember) {
            throw new AppError("Member not found", 403)
        }

        const deletedSubscription = await Subscription.findOneAndDelete({memberId: memberId})
        if (!deletedSubscription) {
            console.log(`Member ${memberId} had no subscriptions`);
        } else {
            console.log(`Member ${memberId} had ${deletedSubscription._id} subscriptions`);
        }


        return { success: true, message: 'Member was deletes' }
    } catch (err) {
        if (err instanceof AppError) {
            throw err
        } else {
            console.error('Error deleting member: ', err);
            throw new Error("Internal Server Error")

        }
    }
}

const getMember = async (memberId) => {
    try {
        const member = Member.findById(memberId)

        if (!member) {
            throw new AppError(`Member ${memberId} was not found.`, 401)
        }

        else return member;
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllMembers,
    addMember, updateMember,
    deleteMember,
    getMember
}