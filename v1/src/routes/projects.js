//Validations
const schemas = require('../validations/projects')

//Validate middleware
const validate = require('../middlewares/validate')

const router = require('express').Router()
const { create, index } = require('../controllers/projects')

router.get('/', index)

router.post('/', validate(schemas.createValidation), create)

module.exports = router