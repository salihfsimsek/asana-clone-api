const BaseService = require('./BaseService')
const TaskModel = require('../models/tasks')

class Task extends BaseService {
    model = TaskModel

    async findOne(where, expand) {
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


    async list(where) {
        return TaskModel.find(where || {}).populate({
            path: 'user_id',
            select: 'full_name email profile_image'
        }).populate({
            path: 'project_id',
            select: 'name'
        })
    }

}

module.exports = new Task()