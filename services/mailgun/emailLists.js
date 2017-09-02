const mailgun = require('mailgun-js')

class EmailService {
    constructor({ apiKey, domain }) {
        this._mailgun = mailgun({ apiKey, domain })
    }
    getEmailLists() {
        return this._mailgun.lists().list().then(res => res.items)
    }
    getEmailList(address) {
        return this._mailgun.lists(address).info().then(res => res.list)
    }
    getEmailListMember(emailListAddress, memberAddress) {
        return this._mailgun.lists(emailListAddress).members(memberAddress).info().then(res => res.member)
    }
    getEmailListAllMembers(address) {
        return this._mailgun.lists(address).members().list().then(res => res.items)
    }
    addMembersToEmailList(emailListAddress, members, subscribed) {
        return this._mailgun.lists(emailListAddress).members().add({
            members,
            subscribed,
            upsert: false
        }).then(res => res.list)
    }
    removeMemberFromEmailList(emailListAddress, memberAddress) {
        return this._mailgun.lists(emailListAddress).members(memberAddress).delete().then(res => res.member)
    }
}

// getEmailLists("test_list@mgmail.manifestare.com", "veterinsislive09@yahoo.com")
// .then(res => console.log('res', res))
// .catch(error => console.error('error', error))

module.exports = EmailService