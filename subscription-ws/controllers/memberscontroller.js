const membersService = require('../services/membersService')
const subscriptionsService = require('../services/subscriptionService')

const getAllMembers = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 300

    try {
            
        const result = await membersService.getAllMembers(page, limit)
        res.status(200).json(result)
    } catch (err) {
        console.error('Error get all member: ', err);
        res.status(err.statusCode || err.status).json({message: err.message})
    }

}

const getMember = async (req, res)=> {
    try {
        const {memberId} = req.params 
        const member = await membersService.getMember(memberId)
        res.status(200).json({member})
    } catch (err) {
        throw err
    }
}

const addMember = async (req, res) => {
    const memberInfo = req.body

    try {
        const newMember = await membersService.addMember(memberInfo)
        res.status(200).json({newMember})
    } catch (err) {
        console.error('Error in add members: ', err);
        res.status(err.status).json({message: err.message})
    }
}

const updateMember = async (req, res) => {
    const {memberId} = req.params
    
    try {
        const data = req.body
        const result = await membersService.updateMember(memberId, data)

        if (result) {
            res.status(200).json({result})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    } catch (err) {
        console.error('Error updaing member: ', err);
        res.status(err.statusCode).json({message: err.message})
    }
}

const deleteMember = async (req, res) => {
    const {memberId} = req.params

    try {
        const result = await membersService.deleteMember(memberId)
        //const deletedSubscription = await subscriptionsService.deleteSubscription(memberId)

        // if (deletedSubscription === 0 ) {
        //     console.log('Memeber had no subscriptions');
        // }

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: 'Error deleting member ' + memberId})
    }
}

module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember,
    getMember
}