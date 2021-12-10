const express = require('express');
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const config = require('./config/index')
const loaders = require('./loaders/index')
const events = require('./scripts/events')
const path = require('path')

//////Routes//////
const { ProjectRoutes, UserRoutes, SectionRoutes } = require('./routes/index')

//Tum yapilandirilmalarin calistirilmasi
config()

//Tum loaderlarin tek noktadan calistirilmasi
loaders()

events()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(fileUpload())
app.use('/uploads/', express.static(path.join(__dirname, './uploads')))
//////Routes//////
app.use('/api/projects', ProjectRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/sections', SectionRoutes)


module.exports = app