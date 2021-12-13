//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

//Validations
const schemas = require('../validations/sections')
const router = require('express').Router()
const { index, create, update, deleteSection } = require('../controllers/sections')


router.get('/:projectId', authenticate, index)
router.post('/', authenticate, validate(schemas.createValidation), create)
// router.patch('/:id', authenticate, validate(schemas.updateValidation), update)
router.delete(authenticate, deleteSection)

module.exports = router