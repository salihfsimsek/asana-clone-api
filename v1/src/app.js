const express = require('express');
const helmet = require('helmet')
const config = require('./config/index')
const loaders = require('./loaders/index')
const events = require('./scripts/events')

//////Routes//////
const { ProjectRoutes, UserRoutes } = require('./routes/index')

//Tum yapilandirilmalarin calistirilmasi
config()

//Tum loaderlarin tek noktadan calistirilmasi
loaders()

events()

const app = express()

app.use(express.json())
app.use(helmet())

//////Routes//////
app.use('/api/projects', ProjectRoutes)
app.use('/api/users', UserRoutes)


module.exports = app