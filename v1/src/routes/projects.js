//Validations
const schemas = require('../validations/projects')

//Validate middleware
const validate = require('../middlewares/validate')
const idChecker = require('../middlewares/idChecker')

const authenticateToken = require('../middlewares/authenticate')

const router = require('express').Router()

const { create, index, update, deleteProject } = require('../controllers/projects')

router.get('/', authenticateToken, index)

router.post('/', authenticateToken, validate(schemas.createValidation), create)

router.patch('/:id', idChecker('id'), authenticateToken, validate(schemas.updateValidation), update)

router.delete('/:id', idChecker('id'), authenticateToken, deleteProject)

module.exports = router