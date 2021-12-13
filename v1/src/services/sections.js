const SectionModel = require('../models/sections')

const insert = (data) => {
    return SectionModel.create(data)
}

const list = (where) => {
    return SectionModel.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email profile_image'
    }).populate({
        path: 'project_id',
        select: 'name'
    })
}

const modify = (id, data) => {
    return SectionModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

const remove = (item) => {
    return SectionModel.deleteOne(item)
}

module.exports = { insert, list, modify, remove }