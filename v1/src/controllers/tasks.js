const { insert, modify, list, remove } = require('../services/tasks')
const httpStatus = require('http-status')


const create = async (req, res) => {
    req.body.user_id = req.user._id
    try {
        const createdTask = await insert(req.body)
        res.status(httpStatus.CREATED).send(createdTask)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const update = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not Found' })
    try {
        const updatedTask = await modify(req.params.id, req.body)
        res.status(200).send(updatedTask)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const deleteTask = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not Found' })
    try {
        await remove({ _id: req.params.id })
        res.status(httpStatus.OK).send({ message: 'Succesfully Deleted' })
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

module.exports = { create, update, deleteTask }