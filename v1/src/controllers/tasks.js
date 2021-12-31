const { findOne, insert, modify, list, remove } = require('../services/tasks')
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

const makeComment = async (req, res) => {
    req.body.user_id = req.user
    try {
        const currentTask = await findOne({ _id: req.params.id })
        currentTask.comments.push(req.body)
        const updatedTask = await currentTask.save()
        res.status(200).send(updatedTask)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const deleteComment = async (req, res) => {
    try {
        const updatedTask = await modify(req.params.id, { $pull: { comments: { _id: req.params.commentId } } })
        res.status(200).send(updatedTask)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const addSubTask = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'ID not found' })
    req.body.user_id = req.user._id
    try {
        const mainTask = await findOne({ _id: req.params.id })
        const newSubTask = await insert(req.body)
        mainTask.sub_tasks.push(newSubTask)
        await mainTask.save()
        res.status(httpStatus.CREATED).send(mainTask)

    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message })
    }
}

const fetchTask = async (req, res) => {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'ID not found' })

    try {
        const task = await findOne({ _id: req.params.id }, true)
        if (!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'Task not found' })
        res.status(httpStatus.OK).send(task)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message })
    }
}

module.exports = { create, update, deleteTask, makeComment, deleteComment, addSubTask, fetchTask }