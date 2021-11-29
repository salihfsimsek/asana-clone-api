const ProjectModel = require('../models/projects')

const insert = (data) => {
    return ProjectModel.create(data)
}

const list = (where) => {
    return ProjectModel.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email'
    })
}

const modify = (id, data) => {
    return ProjectModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

module.exports = { insert, list, modify }