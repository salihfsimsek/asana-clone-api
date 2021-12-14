const TaskModel = require('../models/tasks')

const insert = (data) => {
    return TaskModel.create(data)
}

const list = (where) => {
    return TaskModel.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email profile_image'
    }).populate({
        path: 'project_id',
        select: 'name'
    })
}

const modify = (id, data) => {
    return TaskModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

const remove = (item) => {
    return TaskModel.deleteOne(item)
}

module.exports = { insert, list, modify, remove }