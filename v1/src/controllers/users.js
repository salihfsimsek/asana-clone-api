const httpStatus = require('http-status')

const { insert, list, loginUser } = require('../services/users')
const projectService = require('../services/projects')

const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')

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
        req.body.password = passwordToHash(req.body.password)
        let result = await loginUser(req.body)
        if (!result) return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' })
        result = {
            ...result.toObject(),
            access_token: generateAccessToken({ email: result.email, _id: result._id }),
            refresh_token: generateRefreshToken({ email: result.email, _id: result._id })
        }
        res.status((httpStatus.OK)).send(result)
    } catch (err) {
        console.log(err)
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

const projectList = async (req, res) => {
    try {
        const usersProjects = await projectService.list({ user_id: req.user })
        res.status(httpStatus.OK).send(usersProjects)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

module.exports = { create, index, login, projectList }