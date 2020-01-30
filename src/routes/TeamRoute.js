const express = require('express')

const router = express.Router()

const controller = require('../controllers/TeamController')
const authService = require('../services/authService')


router.get('/', controller.getAllTeams)
router.post('/', authService.authorize, controller.createTeam)


module.exports = router
