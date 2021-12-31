const BaseService = require('./BaseService')
const SectionModel = require('../models/sections')

class Section extends BaseService {
    model = SectionModel

    async list(where) {
        return SectionModel.find(where || {}).populate({
            path: 'user_id',
            select: 'full_name email profile_image'
        }).populate({
            path: 'project_id',
            select: 'name'
        })
    }
}

module.exports = new Section()