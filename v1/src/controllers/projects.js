const { insert, list, modify, remove } = require('../services/projects')
const httpStatus = require('http-status')

const create = async (req, res) => {
    try {
        req.body.user_id = req.user
        const createdProject = await insert(req.body)
        res.status(httpStatus.CREATED).send(createdProject)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const index = async (req, res) => {
    try {
        const projects = await list()
        res.status(httpStatus.OK).send(projects)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }
}

const update = async (req, res) => {
    if (!req.params.id)
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Not valid project id' })

    try {
        const updatedProject = await modify(req.params.id, req.body)
        res.status(httpStatus.OK).send(updatedProject)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await remove({ _id: req.params.id })
        if (!deletedProject) {
            return res.status(httpStatus.NOT_FOUND).send({ message: 'Project not found' })
        }
        res.status(httpStatus.OK).send({ message: "Succesfully deleted" })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

module.exports = { create, index, update, deleteProject }