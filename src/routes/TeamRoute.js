const express = require('express')

const router = express.Router()

const controller = require('../controllers/TeamController')
const authService = require('../services/authService')


router.get('/', authService.isAdmin, controller.getTeam)
router.get('/players', authService.authorize, controller.getTeamAndPlayers)
router.post('/', authService.authorize, controller.createTeam)
router.post('/:id/player', authService.authorize, controller.addPlayer)
router.delete('/:id/player', authService.authorize, controller.removePlayer)


module.exports = router
