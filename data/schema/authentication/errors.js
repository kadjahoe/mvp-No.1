const { createError } = require('apollo-errors')

const ForbiddenError = createError('ForbiddenError', {
    message: 'You are not allowed to do this'
})

const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
    message: 'You must be logged in to do this'
})

module.exports = { ForbiddenError, AuthenticationRequiredError }