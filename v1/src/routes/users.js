//Validations
const schemas = require('../validations/users')

//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

const router = require('express').Router()

const { create, index, login, projectList, resetPassword, update, deleteUser, changePassword } = require('../controllers/users')

router.get('/', index)

router.post('/', validate(schemas.createValidation), create)

router.patch('/', authenticate, validate(schemas.updateValidation), update)

router.post('/login', validate(schemas.loginValidation), login)

router.get('/projects', authenticate, projectList)

router.post('/reset-password', validate(schemas.resetPasswordValidation), resetPassword)

router.put('/change-password', authenticate, validate(schemas.changePasswordValidation), changePassword)

router.delete('/:id', authenticate, deleteUser)


module.exports = router