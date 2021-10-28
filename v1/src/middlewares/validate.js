const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body)
    if (error) {
        // error.details = [{message: ''}, {message: ''}]
        //return an array only includes message data ['','',',''] like that
        const errorMessage = error.details.map(detail => detail.message).join(', ')
        res.status(httpStatus.BAD_REQUEST).send({ error: errorMessage })
        return
    }
    console.log(value)
    Object.assign(req, value)
    return next()
}

module.exports = validate