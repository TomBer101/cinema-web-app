const express = require('express')

const userController = require('../controllers/usersController')
const {adminRoute} = require('../middlewares/authMiddlewares')

const router = express.Router()
//router.use(adminRoute)

router.get('/', userController.getAllUsers)
router.delete('/', userController.deleteUser)
router.post('/', userController.createUser)
router.patch('/:userId', userController.updateUser)

module.exports = router