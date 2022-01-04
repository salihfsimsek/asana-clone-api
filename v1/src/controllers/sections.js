const SectionService = require('../services/sections')
const httpStatus = require('http-status')

const ApiError = require('../errors/apiError')

const index = async (req, res, next) => {
    try {
        const sections = await SectionService.list({ project_id: req.params.projectId })
        res.status(httpStatus.OK).send(sections)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const create = async (req, res, next) => {
    req.body.user_id = req.user._id
    try {
        const createdSection = await SectionService.create(req.body)
        res.status(httpStatus.CREATED).send(createdSection)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const update = async (req, res, next) => {
    try {
        const updatedSection = await SectionService.update({ _id: req.params.id }, req.body)
        if (!updatedSection)
            return next(new ApiError('Section not found', 404))
        res.status(200).send(updatedSection)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const deleteSection = async (req, res, next) => {
    if (!req.params.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not Found' })
    try {
        const deletedSection = await SectionService.delete({ _id: req.params.id })
        if (!deletedSection)
            return next(new ApiError('Section not found', 404))
        res.status(httpStatus.OK).send({ message: 'Succesfully Deleted' })
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

module.exports = { index, create, update, deleteSection }