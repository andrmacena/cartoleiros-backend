const express = require('express')

const router = express.Router()

const controller = require('../controllers/PlayerController')


router.get('/', controller.getAllPlayers)
router.post('/',controller.createPlayer)
router.put('/update/:id',controller.updatePlayer)
router.delete('/delete/:id',controller.deletePlayer)

module.exports = router
