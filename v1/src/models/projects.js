const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    // user_id: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'user'
    // },
}, { timestamps: true, versionKey: false })

const ProjectModel = mongoose.model('Project', ProjectSchema)

module.exports = ProjectModel