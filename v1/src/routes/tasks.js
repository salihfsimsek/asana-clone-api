//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

//Validations
const schemas = require('../validations/tasks')
const router = require('express').Router()
const { index,create, update, deleteTask, makeComment, deleteComment, addSubTask, fetchTask } = require('../controllers/tasks')


router.post('/', authenticate, validate(schemas.createValidation), create)
router.get('/', authenticate, index)
router.patch('/:id', authenticate, validate(schemas.updateValidation), update)
router.get('/:id', authenticate, fetchTask)
router.post('/:id/make-comment', authenticate, validate(schemas.commentValidation), makeComment)
router.post('/:id/add-sub-task', authenticate, validate(schemas.createValidation), addSubTask)
router.delete('/:id/:commentId', authenticate, deleteComment)
router.delete(authenticate, deleteTask)

module.exports = router