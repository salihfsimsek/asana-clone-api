const { insert, list } = require('../services/users')
const httpStatus = require('http-status')

const { passwordToHash } = require('../scripts/utils/helper')

const create = async (req, res) => {

    const cryptedPassword = passwordToHash(req.body.password)
    req.body.password = cryptedPassword
    try {
        const createdUser = await insert(req.body)
        res.status(httpStatus.CREATED).send(createdUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
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

module.exports = { create, index }