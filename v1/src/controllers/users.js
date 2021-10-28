const { insert, list, loginUser } = require('../services/users')
const httpStatus = require('http-status')

const { passwordToHash } = require('../scripts/utils/helper')

const create = async (req, res) => {

    req.body.password = passwordToHash(req.body.password)

    try {
        const createdUser = await insert(req.body)
        res.status(httpStatus.CREATED).send(createdUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const result = await loginUser({ email: req.body.email })
        if (!result) return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' })
        res.status((httpStatus.OK)).send(result)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const index = async (req, res) => {
    try {
        const users = await list()
        res.status(httpStatus.OK).send(users)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

module.exports = { create, index, login }