const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Player = require('../models/Player')
const Team = require('../models/Team')

const connection = new Sequelize(dbConfig)

User.init(connection)
Player.init(connection)
Team.init(connection)


User.associate(connection.models)
Player.associate(connection.models)
Team.associate(connection.models)

module.exports = connection
