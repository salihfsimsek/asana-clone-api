const BaseService = require('./BaseService')
const UserModel = require('../models/users')

class User extends BaseService {
    model = UserModel

    async loginUser(loginData) {
        return UserModel.findOne(loginData)
    }

}

module.exports = new User()