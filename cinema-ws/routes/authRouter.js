const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)

module.exports = router;