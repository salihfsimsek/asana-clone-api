//Validations
const schemas = require('../validations/projects')

//Validate middleware
const validate = require('../middlewares/validate')

const authenticateToken = require('../middlewares/authenticate')

const router = require('express').Router()

const { create, index, update } = require('../controllers/projects')

router.get('/', authenticateToken, index)

router.post('/', authenticateToken, validate(schemas.createValidation), create)

router.patch('/:id', authenticateToken, validate(schemas.updateValidation), update)

module.exports = router