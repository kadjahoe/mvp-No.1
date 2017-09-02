const { createError } = require('apollo-errors')

const UnknownError = createError('UnknownError', {
    message: 'An unknown error has occured'
})

module.exports = { UnknownError }