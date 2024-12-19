const express = require('express')
const membersController = require('../controllers/memberscontroller')
const subscriptionsController = require('../controllers/subscriptionsController')

const router = express.Router()

router.get('/', membersController.getAllMembers)
router.delete('/:memeberId', subscriptionsController.deleteSubscription)


module.exports = router