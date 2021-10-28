//Validations
const schemas = require('../validations/users')

//Validate middleware
const validate = require('../middlewares/validate')

const router = require('express').Router()
const { create, index, login } = require('../controllers/users')

router.get('/', index)

router.post('/', validate(schemas.createValidation), create)

router.post('/login', validate(schemas.loginValidation), login)

module.exports = router