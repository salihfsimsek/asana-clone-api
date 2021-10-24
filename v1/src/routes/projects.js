//Validations

//Validate middleware

const router = require('express').Router()
const { create, index } = require('../controllers/projects')

router.get('/', index)

router.post('/',create)

module.exports = router