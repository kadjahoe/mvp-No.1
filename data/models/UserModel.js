const { domain, api_key } = require('../../config').mailgun
const EmailService = require('../../services/mailgun/emailLists')

class UserModel {
    constructor(user) {
        this.username = user.username
        this.id = user.id
        this.access = user.access
        // get from db in the future
        this.config = { mailgun: {} }
        if(this.access.ORG_ADMIN){
            this.config.mailgun = {
                domain,
                api_key
            }
        }
        this.emailService = new EmailService({ apiKey: api_key, domain })
    }
}

module.exports = UserModel