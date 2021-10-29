const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    let token = authHeader && fauthHeader.split(' ')[1]
    if (token === null)
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'You have no permission to do this' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err)
            return res.status(httpStatus.FORBIDDEN).send({ message: 'Invalid token' })
        req.user = user
        next()
    })
}

module.exports = authenticateToken