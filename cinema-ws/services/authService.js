const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../mongoDB/models/userModel')
const permissionsRepo = require('../repositories/persmissionsRepo')
const usersRepo = require('../repositories/usersRepo')
const {AppError} = require('../classes/appErrors')

const saltRounds = 10;

const login = async (userName, password) => {
    try {
        const user = await User.findOne({userName: userName})

        if (!user) {
            throw new Error('Username was not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid password')
        }

        return user._id.toString();

        // create payload: session or jwt
    } catch (err) {
        console.error('Error login user: ', err)
        throw new Error('Internal server error')
    }

}

const register = async (userName, password) => {
    try {
        const existingUser = await User.findOne({ userName })

        if (!existingUser) {
            throw new AppError('Invalid user name.', 404)
        }

        if (existingUser && existingUser.password) {
            throw new AppError('User name is in used.', 404)
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        existingUser.password = hashedPassword;
        await existingUser.save()

        return existingUser
    } catch (err) {
        console.error('Error register user: ', err);
        throw err;
    }

}

module.exports = {
    login,
    register
}