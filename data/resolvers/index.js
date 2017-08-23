const {
    getEmailLists,
    getEmailList,
    getEmailListMember,
    getEmailListAllMembers,
    addMembersToEmailList,
    removeMmeberFromEmailList
} = require('../../services/mailgun/emailLists')

const resolvers = {
    allEmailLists: async () => {
        const lists = await getEmailLists()
        const getMembers = lists.map(async list => {
            const members = await getEmailListAllMembers(list.address)
            return Object.assign({}, list, { members })
        })
        const finalLists = await Promise.all(getMembers)
        return finalLists
    },
    getEmailList: async ({ address }) => {
        const list = await getEmailList(address)
        list.members = await getEmailListAllMembers(address)
        return list
    },
    getEmailListMember: ({ emailListAddress, memberAddress }) => {
        return getEmailListMember(emailListAddress, memberAddress)
    },
    getEmailListAllMembers: ({ address }) => {
        return getEmailListAllMembers(address)
    },
    addMembersToEmailList: async ({ emailListAddress, memberList }) => {
        try {
            const emailList = await addMembersToEmailList(emailListAddress, memberList.members, memberList.subscribed)
            return {
                emailList,
                changed: true
            }
        } catch(error) {
            console.log('error', error)
            return {
                changed: false
            }
        }
    },
    removeMemberFromEmailList: async ({ emailListAddress, memberAddress }) => {
        try {
            const member = await removeMmeberFromEmailList(emailListAddress, memberAddress)
            return {
                member,
                changed: true
            }
        } catch(error) {
            console.log('error', error)
            return {
                changed: false
            }
        }
    },
}

module.exports = resolvers