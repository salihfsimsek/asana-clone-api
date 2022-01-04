const TaskService = require('../services/tasks')
const httpStatus = require('http-status')

const ApiError = require('../errors/apiError')

const index = async (req, res, next) => {
    try {
        const tasks = await TaskService.list({ _id: req.params.id })
        res.status(httpStatus.OK).send(tasks)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const create = async (req, res, next) => {
    req.body.user_id = req.user._id
    try {
        const createdTask = await TaskService.create(req.body)
        res.status(httpStatus.CREATED).send(createdTask)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const update = async (req, res, next) => {
    try {
        const updatedTask = await TaskService.update({ _id: req.params.id }, req.body)
        if (!updatedTask)
            return next(new ApiError('Task not found', 404))
        res.status(200).send(updatedTask)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskService.remove({ _id: req.params.id })
        if (!deletedTask)
            return next(new ApiError('Task not found', 404))
        res.status(httpStatus.OK).send({ message: 'Succesfully Deleted' })
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const makeComment = async (req, res, next) => {
    req.body.user_id = req.user
    try {
        const currentTask = await TaskService.findOne({ _id: req.params.id })
        if (!currentTask)
            return next(new ApiError('Task not found', 404))
        currentTask.comments.push(req.body)
        const updatedTask = await currentTask.save()
        res.status(200).send(updatedTask)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const updatedTask = await TaskService.update(req.params.id, { $pull: { comments: { _id: req.params.commentId } } })
        if (!updatedTask)
            return next(new ApiError('Task not found', 404))
        res.status(200).send(updatedTask)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const addSubTask = async (req, res, next) => {
    req.body.user_id = req.user._id
    try {
        const mainTask = await TaskService.findOne({ _id: req.params.id })
        if (!mainTask)
            return next(new ApiError('Task not found'))
        const newSubTask = await TaskService.create(req.body)
        mainTask.sub_tasks.push(newSubTask)
        await mainTask.save()
        res.status(httpStatus.CREATED).send(mainTask)

    } catch (err) {
        next(new ApiError(err?.message))
    }
}

const fetchTask = async (req, res, next) => {
    try {
        const task = await TaskService.findOne({ _id: req.params.id }, true)
        if (!task)
            return next(new ApiError('Task not found', 404))
        res.status(httpStatus.OK).send(task)
    } catch (err) {
        next(new ApiError(err?.message))
    }
}

module.exports = { index, create, update, deleteTask, makeComment, deleteComment, addSubTask, fetchTask }