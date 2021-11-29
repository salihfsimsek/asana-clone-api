//Validations
const schemas = require('../validations/users')

//Validate middleware
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

const router = require('express').Router()
const { create, index, login, projectList } = require('../controllers/users')

router.get('/', index)

router.post('/', validate(schemas.createValidation), create)

router.post('/login', validate(schemas.loginValidation), login)

router.get('/projects', authenticate, projectList)

module.exports = router