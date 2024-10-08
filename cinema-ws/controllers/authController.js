const authService = require('../services/authService')
const userRepository = require('../repositories/usersRepo')
const permissionsRepository = require('../repositories/persmissionsRepo')


const signUp = async (req, res) => {
    const {userName, password} = req.body;

    try {
        //sign up
        // experation and permissions
    } catch (err) {

    }
}

// login: validate user name and password -> check permissionis -> name
const login = async (req, res) => {
    try {
        const {userName, password} = req.body;

        const userId = await authService.login(userName, password);  
        const userData = await userRepository.getUserById(userId)
        const userPermissions = await permissionsRepository.getUserPermissions(userId)

        req.session.user = {
            id: userId,
            permissions: userPermissions,
        };

        req.session.cookie.maxAge =  userData.sessionTimeout * 60000;  // Convert minutes to milliseconds
        req.session.cookie._expire = new Date(Date.now() + userData.sessionTimeout * 60000); 

        res.status(200).send({
            message: 'Login successful', 
            userName: `${userData.firstName} ${userData.lastName}`,
            permissions: userPermissions
        });
        
        
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error!'})
    }
}

module.exports = {
    signUp,
    login
}