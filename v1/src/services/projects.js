const BaseService = require('./BaseService')
const ProjectModel = require('../models/projects')

class Project extends BaseService {
    model = ProjectModel

    async list(where) {
        return this.model.find(where || {}).populate({
            path: 'user_id',
            select: 'full_name email profile_image'
        })
    }
}

module.exports = new Project()