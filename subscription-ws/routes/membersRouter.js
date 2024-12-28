const express = require('express')
const membersController = require('../controllers/memberscontroller')

const router = express.Router()

router.get('/', membersController.getAllMembers)
router.get('/:memberId', membersController.getMember)

router.post('/', membersController.addMember)
router.patch('/:memberId', membersController.updateMember)
router.delete('/:memberId', membersController.deleteMember)

module.exports = router