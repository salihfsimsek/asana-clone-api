const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    full_name: String,
    password: String,
    email: String,
    profile_image: String
}, { timestamps: true, versionKey: false })

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel