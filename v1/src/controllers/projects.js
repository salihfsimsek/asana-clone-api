const { insert, list } = require('../services/projects')
const httpStatus = require('http-status')
const create = async (req, res) => {
    try {
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

module.exports = { create, index }