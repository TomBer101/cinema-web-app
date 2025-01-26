const express = require('express')
const subscriptionController = require('../controllers/subscriptionController')
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router()

router.post('/:memberId', authMiddleware.checkPermissions('Create Subscriptions'), subscriptionController.addSubscription)
router.get('/', authMiddleware.checkPermissions('View Subscriptions'), subscriptionController.getAllSubscriptions)
router.delete('/:memberId', authMiddleware.checkPermissions('Delete Subscriptions'), subscriptionController.deleteSubscription)

module.exports = router