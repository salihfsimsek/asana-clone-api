const UserModel = require('../models/users')

const insert = (data) => {
    return UserModel.create(data)
}

const list = () => {
    return UserModel.find()
}

module.exports = { insert }