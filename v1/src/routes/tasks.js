//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')
const idChecker = require('../middlewares/idChecker')

//Validations
const schemas = require('../validations/tasks')
const router = require('express').Router()
const { index, create, update, deleteTask, makeComment, deleteComment, addSubTask, fetchTask } = require('../controllers/tasks')


router.post('/', authenticate, validate(schemas.createValidation), create)
router.get('/', authenticate, index)
router.patch('/:id', idChecker('id'), authenticate, validate(schemas.updateValidation), update)
router.get('/:id', idChecker('id'), authenticate, fetchTask)
router.delete('/:id', idChecker('id'), authenticate, deleteTask)
router.post('/:id/make-comment', idChecker('id'), authenticate, validate(schemas.commentValidation), makeComment)
router.post('/:id/add-sub-task', idChecker('id'), authenticate, validate(schemas.createValidation), addSubTask)
router.delete('/:id/:commentId', idChecker('id'), authenticate, deleteComment)

module.exports = router