const ProjectService = require('../services/projects')
const httpStatus = require('http-status')

const ApiError = require('../errors/apiError')

const create = async (req, res, next) => {
    try {
        req.body.user_id = req.user
        const createdProject = await ProjectService.create(req.body)
        res.status(httpStatus.CREATED).send(createdProject)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const index = async (req, res, next) => {
    try {
        const projects = await ProjectService.list()
        res.status(httpStatus.OK).send(projects)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const update = async (req, res, next) => {
    try {
        const updatedProject = await ProjectService.update({ _id: req.params.id }, req.body)
        if (!updatedProject)
            return next(new ApiError('Project not found', 404))
        res.status(httpStatus.OK).send(updatedProject)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const deleteProject = async (req, res, next) => {
    try {
        const deletedProject = await ProjectService.delete({ _id: req.params.id })
        if (!deletedProject) {
            return next(new ApiError('Project not found', 404))
        }
        res.status(httpStatus.OK).send({ message: "Succesfully deleted" })
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

module.exports = { create, index, update, deleteProject }