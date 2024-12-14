const express = require('express')
const subscriptionController = require('../controllers/subscriptionController')
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router()

router.post('/:memberId', subscriptionController.addSubscription)
router.get('/', authMiddleware.checkPermissions('View Subscriptions'), subscriptionController.getAllSubscriptions)

module.exports = router