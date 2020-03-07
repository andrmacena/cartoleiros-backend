const express = require('express')

const router = express.Router()

const controller = require('../controllers/UserController')
const authService = require('../services/authService')


router.get('/', authService.isAdmin, controller.getAllUsers)
router.post('/', controller.createUser)
router.post('/authenticate', controller.authenticate)

module.exports = router
