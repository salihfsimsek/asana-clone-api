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

module.exports = { insert, list, loginUser }