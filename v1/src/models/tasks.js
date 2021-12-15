const mongoose = require('mongoose')
const logger = require('../scripts/logger/tasks')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    assigned_to: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    due_date: Date,
    statuses: [String],
    section_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Section'
    },
    project_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    order: Number,
    isCompleted: Boolean,
    comments: [{
        value: String,
        created_at: Date,
        updated_at: Date,
        user_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
    }],
    media: [String],
    sub_tasks: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Task'
    }]
}, { timestamps: true, versionKey: false })

TaskSchema.post('save', (doc) => {
    logger.log({
        level: 'info',
        message: doc
    })
})

const TaskModel = mongoose.model('Task', TaskSchema)

module.exports = TaskModel