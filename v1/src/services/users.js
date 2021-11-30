const UserModel = require('../models/users')

const insert = (data) => {
    return UserModel.create(data)
}

const loginUser = (loginData) => {
    return UserModel.findOne(loginData)
}

const list = () => {
    return UserModel.find()
}

const modify = (where, data) => {
    return UserModel.findOneAndUpdate(where, data, { new: true })
}

module.exports = { insert, list, loginUser, modify }