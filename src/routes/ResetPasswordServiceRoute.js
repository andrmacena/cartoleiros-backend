const express = require('express')

const controller = require('../controllers/ResetPasswordServiceController')
const router = express.Router()


router.post('/send', controller.sendEmailResetPassword)

module.exports = router
