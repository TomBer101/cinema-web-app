const express = require('express')
const membersController = require('../controllers/membersController')
const authMiddleware = require('../middlewares/authMiddlewares')

const router = express.Router()

//only for admin?

router.get('/', authMiddleware.checkPermissions('View Subscriptions'), membersController.getAllMembers)
router.get('/:memberId', authMiddleware.checkPermissions('View Subscriptions'), membersController.getMember)
router.patch('/:memberId', authMiddleware.checkPermissions('Update Subscription'), membersController.updateMember)
router.post('/', authMiddleware.checkPermissions('Create Subscriptions'), membersController.addMember)
router.delete('/', authMiddleware.checkPermissions('Delete Subscription'), membersController.deleteMember)

module.exports = router