const httpStatus = require('http-status')
const uuid = require('uuid')

const eventEmitter = require('../scripts/events/eventEmitter')

const { insert, list, loginUser, modify } = require('../services/users')
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

const resetPassword = async (req, res) => {

    const newPassword = uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`
    try {
        const updatedUser = await modify({ email: req.body.email }, { password: passwordToHash(newPassword) })
        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: "User not found" })
        eventEmitter.emit('send_email', {
            to: updatedUser.email,
            subject: 'Şifre Sıfırlama',
            html: `Şifre sıfırlama işleminiz gerçekleştirilmiştir. <br/> Giriş yaptıktan sonra şifrenizi sıfırlamayı unutmayın. <br/> Yeni şifreniz: ${newPassword}`
        })
        res.status(httpStatus.OK).send({
            'message': "Şifre sıfırlama işlemi için sisteme kayıtlı email adresine mail gönderilmiştir"
        })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const update = async (req, res) => {
    try {
        const updatedUser = await modify({ _id: req.user._id }, req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ err: 'An error occured while updating' })
    }
}

module.exports = { create, index, login, projectList, resetPassword, update }