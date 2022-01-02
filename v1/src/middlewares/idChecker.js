const ApiError = require('../errors/apiError');

const idChecker = (field) => async (req, res, next) => {
    if (!req.params[field || 'id']?.match(/^[0-9a-fA-F]{24}$/)) {
        next(new ApiError('ID not valid', 400))
        return;
    }
    next()
}

module.exports = idChecker