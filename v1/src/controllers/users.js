const httpStatus = require('http-status')
const uuid = require('uuid')

const eventEmitter = require('../scripts/events/eventEmitter')
const path = require('path')

const UserService = require('../services/users')
const ProjectService = require('../services/projects')

const ApiError = require('../errors/apiError')

const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')

const create = async (req, res, next) => {

    req.body.password = passwordToHash(req.body.password)

    try {
        const createdUser = await UserService.create(req.body)
        res.status(httpStatus.CREATED).send(createdUser)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const login = async (req, res, next) => {
    try {
        req.body.password = passwordToHash(req.body.password)
        let result = await UserService.loginUser(req.body)
        if (!result) return next(new ApiError('User not found', 404))
        result = {
            ...result.toObject(),
            access_token: generateAccessToken({ email: result.email, _id: result._id }),
            refresh_token: generateRefreshToken({ email: result.email, _id: result._id })
        }
        res.status((httpStatus.OK)).send(result)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const index = async (req, res, next) => {
    try {
        const users = await UserService.list()
        res.status(httpStatus.OK).send(users)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const projectList = async (req, res, next) => {
    try {
        const usersProjects = await ProjectService.list({ user_id: req.user })
        res.status(httpStatus.OK).send(usersProjects)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const resetPassword = async (req, res, next) => {

    const newPassword = uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`
    try {
        const updatedUser = await UserService.update({ email: req.body.email }, { password: passwordToHash(newPassword) })
        if (!updatedUser) return next(new ApiError('User not found', 404))
        eventEmitter.emit('send_email', {
            to: updatedUser.email,
            subject: 'Şifre Sıfırlama',
            html: `Şifre sıfırlama işleminiz gerçekleştirilmiştir. <br/> Giriş yaptıktan sonra şifrenizi sıfırlamayı unutmayın. <br/> Yeni şifreniz: ${newPassword}`
        })
        res.status(httpStatus.OK).send({
            'message': "Şifre sıfırlama işlemi için sisteme kayıtlı email adresine mail gönderilmiştir"
        })
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const update = async (req, res, next) => {
    try {
        const updatedUser = await UserService.update({ _id: req.user._id }, req.body)
        if (!updatedUser)
            return next(new ApiError('User not found', 404))
        res.status(200).send(updatedUser)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await UserService.delete({ _id: req.params.id })
        if (!deletedUser) {
            return next(new ApiError('User not found', 404))
        }
        res.status(httpStatus.OK).send({ err: 'User deleted' })
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const changePassword = async (req, res, next) => {
    req.body.password = passwordToHash(req.body.password)
    try {
        const updatedUser = await UserService.update({ _id: req.user._id }, req.body)
        if (!updatedUser)
            return next(new ApiError('User not found', 404))
        res.status(200).send(updatedUser)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const updateProfileImage = async (req, res, next) => {
    if (!req?.files?.profile_image) {
        return next(new ApiError('Please upload an image', 400))
    }
    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req?.user?._id}${extension}`
    const folderPath = path.join(__dirname, '../uploads/users', fileName)
    req.files.profile_image.mv(folderPath, async function (err) {
        if (err) return next(new ApiError(err?.message))
        try {
            const updatedUser = await UserService.update({ _id: req.user._id }, { profile_image: fileName })
            if (!updatedUser) return next(new ApiError('User not found', 404))
            res.status(httpStatus.OK).send(updatedUser)
        } catch (err) {
            next(new ApiError(err?.message))
        }
    })
}

module.exports = { create, index, login, projectList, resetPassword, update, deleteUser, changePassword, updateProfileImage }