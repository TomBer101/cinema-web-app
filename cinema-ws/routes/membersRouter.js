const express = require('express')
const membersController = require('../controllers/membersController')
const authMiddleware = require('../middlewares/authMiddlewares')

const router = express.Router()

//only for admin?

router.get('/', authMiddleware.checkPermissions('View Subscriptions'), membersController.getAllMembers)
router.get('/:memberId', authMiddleware.checkPermissions('View Subscriptions'), membersController.getMember)

router.patch('/:memberId', membersController.updateMember)
router.post('/', membersController.addMember)
router.delete('/', membersController.deleteMember)

module.exports = router