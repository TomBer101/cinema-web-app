const JFile = require('jsonfile')
const path = require('path')

const file = path.join(__dirname, '../data/Permissions.json')

const getAllPersmissions = () => {
    return JFile.readFile(file)
};

module.exports = {
    getAllPersmissions,
}