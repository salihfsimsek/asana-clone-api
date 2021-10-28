//Validations
const schemas = require('../validations/users')

//Validate middleware
const validate = require('../middlewares/validate')

const router = require('express').Router()
const { create, index } = require('../controllers/users')

router.get('/', index)

router.post('/', validate(schemas.createValidation), create)

module.exports = router