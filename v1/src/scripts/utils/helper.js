const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH_KEY).toString()).toString()

}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1w' })
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '2w' })
}

module.exports = { passwordToHash, generateAccessToken, generateRefreshToken }