const express = require('express');
const helmet = require('helmet')
const config = require('./config/index')

//Tum yapilandirilmalarin calistirilmasi
config()

const app = express()

app.use(express.json())
app.use(helmet())

module.exports = app