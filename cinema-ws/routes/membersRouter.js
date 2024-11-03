const express = require('express')
const membersController = require('../controllers/membersController')
const authMiddleware = require('../middlewares/authMiddlewares')

const router = express.Router()

//only for admin?

router.get('/', authMiddleware.checkPermissions('View Subscriptions'), membersController.getAllMembers)
router.patch('/:memberId', membersController.updateMember)
router.post('/', membersController.addMember)
router.delete('/:memberId', membersController.deleteMember)

module.exports = router