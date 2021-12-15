//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

//Validations
const schemas = require('../validations/tasks')
const router = require('express').Router()
const { create, update, deleteTask } = require('../controllers/tasks')


router.post('/', authenticate, create)
router.patch('/:id', authenticate, validate(schemas.updateValidation), update)
router.delete(authenticate, deleteTask)

module.exports = router