const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Player = require('../models/Player')

const connection = new Sequelize(dbConfig)

User.init(connection)
Player.init(connection)

module.exports = connection


