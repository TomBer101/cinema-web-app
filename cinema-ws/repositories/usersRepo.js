const JFile = require('jsonfile')
const path = require('path')

const file = path.join(__dirname, '../data/Users.json')

const getAllUsers = () => {
    return JFile.readFile(file)
};

module.exports = {
    getAllUsers,
}