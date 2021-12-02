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
    //Gelen data uzerinden bilgileri filtrelemek. Bu islem zaten joi tarafindan yapiliyor.
    //Ogrenme amacli yazilmistir.
    const updateData = Object.keys(data).reduce((obj,key) => {
        if(key !== 'password') obj[key] = data[key]
        return obj
    })
    return UserModel.findOneAndUpdate(where, data, { new: true })
}

module.exports = { insert, list, loginUser, modify }