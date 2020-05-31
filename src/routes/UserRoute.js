const express = require('express')

const router = express.Router()

const controller = require('../controllers/UserController')
const authService = require('../services/authService')


router.get('/', authService.isAdmin, controller.getAllUsers)
router.put('/update', authService.authorize, controller.updateUser)
router.post('/', controller.createUser)
router.post('/authenticate', controller.authenticate)
router.put('/reset', controller.resetPassword)

module.exports = router
