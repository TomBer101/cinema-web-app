const JFile = require('jsonfile')
const path = require('path');
const { AppError } = require('../classes/appErrors');

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
            throw new AppErrorError('User not found', 404);
        }

        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = (id) => {
    try {
      const {users} = JFile.readFileSync(file);
  
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        JFile.writeFileSync(file, {users})
        return true;
      }
  
      return false;
    } catch (error) {
      console.error('Error deleting entity:', error);
      return false;
    }
}

const updateUser = (id, updatedUser) => {
    try {
        const {users} = JFile.readFileSync(file)

        const index = users.findIndex(user => user.id === id)
        if (index !== -1 ) {
            users[index] = {id, ...updatedUser}
            JFile.writeFileSync(file, {users})
            return true
        }

        return false
    } catch (err) {
        console.error('Error updating entity:', err);
        return false;
    }
}

const addUser = (id, userData) => {
    try {
        const {users} = JFile.readFileSync(file)

        const createdDate = new Date().toLocaleDateString()
        const newUsers = [{id: id, createdDate, ...userData}, ...users]

        JFile.writeFileSync(file, {users: newUsers})
        return true
    } catch (err) {
        console.error('Error updating entity:', err);
        return false;
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    addUser    
}