const JFile = require('jsonfile')
const path = require('path')

const file = path.join(__dirname, '../data/Users.json')

const getAllUsers = () => {
    return JFile.readFile(file)
};


// Function to read user data by user id
const getUserById = async (id) => {
    try {
        const usersData = await JFile.readFile(file);
        const user = usersData.users.find(u => u.id === id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    getAllUsers,
    getUserById    
}