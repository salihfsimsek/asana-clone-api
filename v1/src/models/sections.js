const mongoose = require('mongoose')
const logger = require('../scripts/logger/sections')

const SectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    project_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    },
    order: {
        type: Number
    }
}, { timestamps: true, versionKey: false })

SectionSchema.post('save', doc => {
    logger.log({
        level: 'info',
        message: doc
    })
})

const SectionModel = mongoose.model('Section', SectionSchema)

module.exports = SectionModel