const { AuthenticationRequiredError, ForbiddenError } = require('./errors')
const baseResolver = require('../baseResolver')

const isAuthenticatedResolver = baseResolver.createResolver(
    // Extract the user from context (undefined if non-existent)
    (root, args, { user }) => {
        if (!user) throw new AuthenticationRequiredError()
    }
)

const orgUserAccessResolver = isAuthenticatedResolver.createResolver(
    (root, args, { user }) => {
        if (!user.access.ORG_USER) throw new ForbiddenError()
    }
)

const orgAdminAccessResolver = isAuthenticatedResolver.createResolver(
    (root, args, { user }) => {
        if (!user.access.ORG_ADMIN) throw new ForbiddenError()
    }
)

const developerAccessResolver = isAuthenticatedResolver.createResolver(
    (root, args, { user }) => {
        if (!user.access.DEVELOPER) throw new ForbiddenError()
    }
)

module.exports = { orgUserAccessResolver, orgAdminAccessResolver, developerAccessResolver }