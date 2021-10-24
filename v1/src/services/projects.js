const ProjectModel = require('../models/projects')

const insert = (projectData) => {
    return ProjectModel.create(projectData)
}

const list = () => {
    return ProjectModel.find()
}

module.exports = { insert, list }