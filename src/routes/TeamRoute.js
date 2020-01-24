const express = require('express')

const router = express.Router()

const controller = require('../controllers/TeamController')


router.get('/', controller.getAllTeams)
router.post('/', controller.createTeam)


module.exports = router
