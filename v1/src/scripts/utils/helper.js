const CryptoJS = require('crypto-js');

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH_KEY).toString()
}

module.exports = { passwordToHash }