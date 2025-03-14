const membersService = require('../services/membersService')

const getAllMembers = async (req, res) => {
    try {
        const page = req.params.page || 1

        
            const members = await membersService.getAllMembers(page)
        res.status(200).json({members})
        
        
    } catch (err) {
        res.status(500).json({err})
    }
}

const getMember = async (req, res) => {
    try {
        const {memberId} = req.params 
        const member = await membersService.getMember(memberId)
        res.status(200).json({member})
    } catch (err) {
        throw err
    }
}

const addMember = async (req, res) => {
    try {
        const result = await membersService.addMember(req.body)

        res.status(result.status).json({...result.data.newMember, movies: []})
    } catch (err) {
        console.error('Error adding member: ', err);

        const statusCode = err.statusCode || 500
        const message = err.message || 'Internal Server Error'

        res.status(statusCode).json({message})        
    }
}

const updateMember = async (req, res) => {
    const {memberId} = req.params

    try {
        const data = req.body
        const result = await membersService.updateMember(memberId, data);
        
        if (result.status === 200) {
            res.status(200).json({message: `Member ${memberId} was updated`,
            member: result.data.result
            })
        }

        else {
            res.status(500).json({message: 'Error updaing member: ', memberId})
        }
    } catch (err) {
        console.error('Error updaing member: ', err);
        res.status(err.status).json({message: err.message})
    }
}

const deleteMember = async (req, res) => {
    const {memberId} = req.query

    try {
        const result = await membersService.deleteMember(memberId)

        if (result.status === 200) {
            res.status(200).json({message: `Member ${memberId} was deleted`})
        }
    } catch (err) {
        res.status(err.status || err.statusCode).json({message: err.message})
    }
}

module.exports = {
    getAllMembers,
    addMember,
    deleteMember,
    updateMember,getMember
}