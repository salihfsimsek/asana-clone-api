const ProjectService = require('../services/projects')
const httpStatus = require('http-status')

const ApiError = require('../errors/apiError')

const create = async (req, res) => {
    try {
        req.body.user_id = req.user
        const createdProject = await ProjectService.create(req.body)
        res.status(httpStatus.CREATED).send(createdProject)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const index = async (req, res) => {
    try {
        const projects = await ProjectService.list()
        res.status(httpStatus.OK).send(projects)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const update = async (req, res, next) => {
    if (!req.params.id)
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Not valid project id' })

    try {
        const updatedProject = await ProjectService.update({ _id: req.params.id }, req.body)
        if (!updatedProject)
            return next(new ApiError('Project not found', 404))
        res.status(httpStatus.OK).send(updatedProject)
    } catch (err) {
        next(new ApiError(e?.message))
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await ProjectService.delete({ _id: req.params.id })
        if (!deletedProject) {
            return res.status(httpStatus.NOT_FOUND).send({ message: 'Project not found' })
        }
        res.status(httpStatus.OK).send({ message: "Succesfully deleted" })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

module.exports = { create, index, update, deleteProject }