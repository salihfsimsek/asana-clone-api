const express = require('express');
const helmet = require('helmet')
const config = require('./config/index')
const loaders = require('./loaders/index')

//////Routes//////
const { ProjectRoutes, UserRoutes } = require('./routes/index')

//Tum yapilandirilmalarin calistirilmasi
config()

//Tum loaderlarin tek noktadan calistirilmasi
loaders()

const app = express()

app.use(express.json())
app.use(helmet())

//////Routes//////
app.use('/projects', ProjectRoutes)
app.use('/users', UserRoutes)


module.exports = app