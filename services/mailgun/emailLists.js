const { api_key, domain } = require('../../config').mailgun

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

function getEmailLists() {
    return mailgun.lists().list().then(res => res.items)
}

function getEmailList(address) {
    return mailgun.lists(address).info().then(res => res.list)
}

function getEmailListMember(emailListAddress, memberAddress) {
    return mailgun.lists(emailListAddress).members(memberAddress).info().then(res => res.member)
}

function getEmailListAllMembers(address) {
    return mailgun.lists(address).members().list().then(res => res.items)
}

function addMembersToEmailList(emailListAddress, members, subscribed) {
    return mailgun.lists(emailListAddress).members().add({
        members,
        subscribed,
        upsert: false
    }).then(res => res.list)
}

function removeMmeberFromEmailList(emailListAddress, memberAddress) {
    return mailgun.lists(emailListAddress).members(memberAddress).delete().then(res => res.member)
}

// getEmailLists("test_list@mgmail.manifestare.com", "veterinsislive09@yahoo.com")
// .then(res => console.log('res', res))
// .catch(error => console.error('error', error))

module.exports = {
    getEmailLists,
    getEmailList,
    getEmailListMember,
    getEmailListAllMembers,
    addMembersToEmailList,
    removeMmeberFromEmailList
}