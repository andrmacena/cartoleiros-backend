const express = require('express')

const UserRoutes = require('./routes/UserRoute')
const PlayerRoutes = require('./routes/PlayerRoute')

require('./database')

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)
app.use('/players', PlayerRoutes)

module.exports = app
