const express = require('express')

const UserRoutes = require('./routes/UserRoute')

require('./database')

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)



module.exports = app
