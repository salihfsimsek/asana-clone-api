const TaskModel = require('../models/tasks')

const findOne = (where, expand) => {
    if (!expand) return TaskModel.findOne(where)
    else return TaskModel.findOne(where)
        .populate({ path: 'user_id', select: 'full_name email profile_image' })
        .populate({
            path: 'comments',
            populate: {
                path: 'user_id',
                select: 'full_name email profile_image',
            }
        })
        .populate({ path: 'sub_tasks', select: 'title description isCompleted assing_to due_date order sub_tasks statuses' })
}

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

module.exports = { insert, list, modify, remove, findOne }