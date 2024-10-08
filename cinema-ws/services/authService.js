const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../mongoDB/models/userModel')
const permissionsRepo = require('../repositories/persmissionsRepo')
const usersRepo = require('../repositories/usersRepo')

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
        if (existingUser && existingUser.password) {
            throw new Error('User name is in used.')
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ userName, password: hashedPassword })
        await newUser.save();

        return newUser
    } catch (err) {
        console.error('Error register user: ', err);
        throw new Error('Error register user')
    }

}

module.exports = {
    login,
    register
}