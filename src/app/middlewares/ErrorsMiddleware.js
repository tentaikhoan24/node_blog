const createErrors = require('http-errors');

function createError(req, res, next) {
    next(createErrors[400]);
}

module.exports = {createError};