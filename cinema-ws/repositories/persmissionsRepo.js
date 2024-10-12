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

const deletePermissions = (id) => {
    try {
        const {permissions} = JFile.readFileSync(file);
    
        const index = permissions.findIndex(p => p.userId === id);
        if (index !== -1) {
          permissions.splice(index, 1);
          JFile.writeFileSync(file, {permissions})
          return true;
        }
    
        return false;
      } catch (error) {
        console.error('Error deleting entity:', error);
        return false;
      }
}

const updatePermissions = (userId, updatedPermissions) => {
    try {
        const {permissions} = JFile.readFileSync(file)

        const index = permissions.findIndex(p => p.userId === userId)
        if (index !== -1 ) {
            permissions[index] = {userId, ...updatedPermissions}
            JFile.writeFileSync(file, {permissions})
            return true
        }

        return false
    } catch (err) {
        console.error('Error updating entity:', err);
        return false;
    }
}

const addUserPermissions = (userId, userPermissions) => {
    try {
        const {permissions} = JFile.readFileSync(file)
        const newPermissions = [{userId, permissions: userPermissions}, ...permissions]

        JFile.writeFileSync(file, {permissions: newPermissions})
        return true
        
    } catch (err) {
        console.error('Error updating entity:', err);
        return false;
    }
}


module.exports = {
    getAllPersmissions,
    getUserPermissions,
    deletePermissions,
    updatePermissions,
    addUserPermissions
}