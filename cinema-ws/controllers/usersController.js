const usersService = require('../services/usersService')

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers()
        res.status(200).json({data: users})
    } catch (err) {
        console.error('Error getting all users: ', err);
        throw new Error('Error getting users')
    }
}


const deleteUser = async (req, res) => {
    try {
        const {userId} = req.query

        usersService.deleteUser(userId)
        res.status(200).json({message: 'User was deleted.'})
    } catch (err) {
        req.status(404).json({message: 'Not been deleted'})
    }
}


const createUser = async (req, res) => {
    try {
        const {userData, userPermissions} = req.body

        const isCreated = await usersService.addUser(userData, userPermissions)
        if (isCreated) {
            res.status(200).json({message: 'User has been added'})
        } else {
            res.status(400).json({message: 'Error adding new user'})
        }
    } catch (err) {
        console.error("Error creating new user: ", err);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const updateUser = () => {
    try {
        const {updatedData, updatedPermissions} = req.body
        const {userId} = req.params

        const updatedUser = usersService.updateUser(userId, updatedData, updatedPermissions)

        if (updatedUser)  res.status(200).json({message: 'User Updated', user: updatedUser})

        else res.status(400).json({message: 'Error updateing user'})
    } catch (err) {
        console.error('Error updaing user: ', err);
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    createUser,
    updateUser
}