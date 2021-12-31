const httpStatus = require('http-status')
const uuid = require('uuid')

const eventEmitter = require('../scripts/events/eventEmitter')
const path = require('path')

const UserService = require('../services/users')
const ProjectService = require('../services/projects')

const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')

const create = async (req, res) => {

    req.body.password = passwordToHash(req.body.password)

    try {
        const createdUser = await UserService.create(req.body)
        res.status(httpStatus.CREATED).send(createdUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        req.body.password = passwordToHash(req.body.password)
        let result = await UserService.loginUser(req.body)
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
        const users = await UserService.list()
        res.status(httpStatus.OK).send(users)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const projectList = async (req, res) => {
    try {
        const usersProjects = await ProjectService.list({ user_id: req.user })
        res.status(httpStatus.OK).send(usersProjects)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const resetPassword = async (req, res) => {

    const newPassword = uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`
    try {
        const updatedUser = await UserService.update({ email: req.body.email }, { password: passwordToHash(newPassword) })
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
        const updatedUser = await UserService.update({ _id: req.user._id }, req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ err: 'An error occured while updating' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserService.delete({ _id: req.params.id })
        if (!deletedUser) {
            return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" })
        }
        res.status(httpStatus.OK).send({ err: 'User deleted' })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const changePassword = async (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    try {
        const updatedUser = await UserService.update({ _id: req.user._id }, req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ err: 'An error occured while updating' })
    }
}

const updateProfileImage = async (req, res) => {
    if (!req?.files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Please upload an image' })
    }
    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req?.user?._id}${extension}`
    const folderPath = path.join(__dirname, '../uploads/users', fileName)
    req.files.profile_image.mv(folderPath, async function (err) {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        try {
            const updatedUser = await UserService.update({ _id: req.user._id }, { profile_image: fileName })
            res.status(httpStatus.OK).send(updatedUser)
        } catch (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'An error occured' })
        }
    })
}

module.exports = { create, index, login, projectList, resetPassword, update, deleteUser, changePassword, updateProfileImage }