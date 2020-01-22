const express = require('express')

const router = express.Router()

const controller = require('../controllers/PlayerController')


router.get('/', controller.getAllPlayers)
//router.post('/',controller.createPlayer)

module.exports = router
