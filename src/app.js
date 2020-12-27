require('dotenv').config({
   path: process.env.NODE_ENV === 'test' ? '.env.test': '.env'
})

const express = require('express')

const UserRoutes = require('./routes/UserRoute')
const PlayerRoutes = require('./routes/PlayerRoute')
const TeamRoutes = require('./routes/TeamRoute')
const ResetPasswordRoutes = require('./routes/ResetPasswordServiceRoute')

require('./database')

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)
app.use('/players', PlayerRoutes)
app.use('/teams', TeamRoutes)
app.use('/service', ResetPasswordRoutes)

module.exports = app
