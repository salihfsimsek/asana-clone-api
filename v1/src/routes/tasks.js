//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

//Validations
const schemas = require('../validations/tasks')
const router = require('express').Router()
const { create, update, deleteTask, makeComment, deleteComment } = require('../controllers/tasks')


router.post('/', authenticate, validate(schemas.createValidation), create)
router.patch('/:id', authenticate, validate(schemas.updateValidation), update)
router.post('/:id/make-comment', authenticate, validate(schemas.commentValidation), makeComment)
router.delete('/:id/:commentId', authenticate, deleteComment)
router.delete(authenticate, deleteTask)

module.exports = router