const { insert, modify, list, remove } = require('../services/sections')
const httpStatus = require('http-status')

const index = async (req, res) => {
    if (!req.params?.projectId) return res.status(httpStatus.NOT_FOUND).send({ error: 'Proje bilgisi yok' })
    try {
        const sections = await list({ project_id: req.params.projectId })
        console.log(sections)
        res.status(httpStatus.OK).send(sections)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const create = async (req, res) => {
    req.body.user_id = req.user._id
    try {
        const createdSection = await insert(req.body)
        res.status(httpStatus.CREATED).send(createdSection)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const update = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not Found' })
    try {
        const updatedSection = await modify(req.params.id, req.body)
        res.status(200).send(updatedSection)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const deleteSection = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not Found' })
    try {
        await delete ({ _id: req.params.id })
        res.status(httpStatus.OK).send({ message: 'Succesfully Deleted' })
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

module.exports = { index, create, update, deleteSection }