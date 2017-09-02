const { orgAdminAccessResolver } = require('../authentication/resolvers')
const { createError, isInstance } = require('apollo-errors')

const ExposedError = createError('ExposedError', {
    message: 'An unknown error has occurred with emails'
});

const allEmailLists = orgAdminAccessResolver.createResolver(
    (root, args, { models: { User } }) => {
        return User.emailService.getEmailLists()
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const emailList = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress }, { models: { User }}) => {
        return User.emailServicegetEmailList(emailListAddress)
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const member = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress, memberAddress }, { models: { User }}) => {
        return User.emailService.getEmailListMember(emailListAddress, memberAddress)
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const addMembersToEmailList = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress, memberList }, { models: { User }}) => {
        return User.emailService.addMembersToEmailList(emailListAddress, memberList.members, memberList.subscribed)
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const removeMemberFromEmailList = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress, memberAddress }, { models: { User }}) => {
        return User.emailService.removeMemberFromEmailList(emailListAddress, memberAddress)
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const EmailList = {
    members(list, _, { models: { User }}) {
        return User.emailService.getEmailListAllMembers(list.address)
    }
}

module.exports = {
    Query: {
        allEmailLists,
        emailList,
        member
    },
    EmailList,
    Mutation: {
        addMembersToEmailList,
        removeMemberFromEmailList
    }
}