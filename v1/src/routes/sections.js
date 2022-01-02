//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')
const idChecker = require('../middlewares/idChecker')

//Validations
const schemas = require('../validations/sections')

const router = require('express').Router()
const { index, create, update, deleteSection } = require('../controllers/sections')


router.get('/:projectId', idChecker('projectId'), authenticate, index)
router.post('/', authenticate, validate(schemas.createValidation), create)
router.patch('/:id', idChecker('id'), authenticate, validate(schemas.updateValidation), update)
router.delete('/:id', idChecker('id'), authenticate, deleteSection)

module.exports = router