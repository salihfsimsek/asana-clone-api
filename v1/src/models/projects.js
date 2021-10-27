const mongoose = require('mongoose');

const logger = require('../scripts/logger/projects')

const ProjectSchema = mongoose.Schema({
    name: String,
    // user_id: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'user'
    // },
}, { timestamps: true, versionKey: false })

// ProjectSchema.pre('save', (next) => {
//     console.log('Oncesi')
//     next()
// })

ProjectSchema.post('save', (doc) => {
    //Log... Successfully saved...
    logger.log({
        level: 'info',
        message: doc
    })

})


const ProjectModel = mongoose.model('Project', ProjectSchema)

module.exports = ProjectModel