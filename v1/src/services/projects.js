const ProjectModel = require('../models/projects')

const insert = (data) => {
    return ProjectModel.create(data)
}

const list = () => {
    return ProjectModel.find()
}

module.exports = { insert, list }