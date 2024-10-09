const JFile = require('jsonfile')
const path = require('path')

const file = path.join(__dirname, '../data/Permissions.json')

const getAllPersmissions = () => {
    return JFile.readFile(file)
};


// Function to get user permissions by user id
const getUserPermissions = async (id) => {
    try {
        const permissionsData = await JFile.readFile(file);
        const userPermissions = permissionsData.permissions.find(u => u.userId === id).permissions;

        if (!userPermissions) {
            throw new Error('Permissions not found');
        }

        return userPermissions;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    getAllPersmissions,
    getUserPermissions,
}