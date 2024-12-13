const express = require('express')
const membersController = require('../controllers/memberscontroller')

const router = express.Router()

router.get('/', membersController.getAllMembers)


module.exports = router