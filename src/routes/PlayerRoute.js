const express = require('express')

const router = express.Router()

const controller = require('../controllers/PlayerController')
const authService = require('../services/authService')


router.get('/', authService.authorize, controller.getAllPlayers)
router.post('/', authService.isAdmin, controller.createPlayer)
router.put('/update/:id', authService.isAdmin, controller.updatePlayer)
router.delete('/delete/:id', authService.isAdmin, controller.deletePlayer)

module.exports = router
