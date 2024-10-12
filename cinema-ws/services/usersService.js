const usersRepo = require('../repositories/usersRepo')
const permissionsRepo = require('../repositories/persmissionsRepo')
const User = require('../mongoDB/models/userModel')

const getAllUsers = async () => {
    try {
        const {users} = await usersRepo.getAllUsers()
        const {permissions} = await permissionsRepo.getAllPersmissions()
    
        const result = users.map(user => {
            const userPermissions = permissions.find(p => p.userId === user.id)
            return {
                ...user,
                permissions: userPermissions.permissions
            }
        })

        return result
    } catch (err) {
        console.error('Error gettung all user: ', err)
        throw new Error('Internal server error')
    }

}

const deleteUser = async (userId) => {
    try {
        const userDeleted = usersRepo.deleteUser(userId)
        const permissionsDeleted =permissionsRepo.deletePermissions(userId)
        await User.deleteOne({_id: userId})
        
        return (userDeleted && permissionsDeleted)
    } catch (err) {
        console.error('Error deleting user: ', err); 
        return false
    }
}

const updateUser = async (userId, userData, permissionsData) => {
    try {
        let updatedUser, updatedPermissions
        if (userData) {
             updatedUser = usersRepo.updateUser(userId, userData)
        }

        if (permissionsData) {
             updatedPermissions = permissionsRepo.updatePermissions(userId, permissionsData)
        }
    
        if (updatedUser && updatedPermissions) {
            return {
                userId,
                ...userData,
                permissions: permissionsData
            }
        }

        return undefined

    } catch (err) {
        console.error('Error updating user: ', err); 
        return false
    }
}

const addUser = async (userData, userPermissions) => {
    try {
        const {userName} = userData

        const existedUser = await User.findOne({userName})
        if (existedUser) {
            throw new Error('User name is already in uses')
        }

        const newUser = new User({userName: userName})
        const savedUser = await newUser.save()
        const mongoId = savedUser._id.toString()

        const isAddedUser = usersRepo.addUser(mongoId, userData)
        const isAddedPermissions = permissionsRepo.addUserPermissions(mongoId, userPermissions)

        return isAddedPermissions && isAddedUser
    } catch (err) {
        console.error('Error adding new user: ', err);
        return false
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    addUser
}