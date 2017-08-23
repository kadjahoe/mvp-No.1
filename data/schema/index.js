const { buildSchema } = require('graphql')

const Schema = buildSchema(`
# email list type.
type EmailList {
    address: String!
    name: String
    members: [Member]
    created_at: String
    access_level: String
    description: String
    members_count: Int
}

# basic set of vars for members. this should be extended for different types of lists
interface BasicMemberVars {
    gender: String
    age: String
}

type MemberVars implements BasicMemberVars {
    gender: String
    age: String
}

# member/recipient of an email list
type Member {
    name: String
    address: String!
    subscribed: Boolean
    vars: MemberVars
}

type Query {
    # get all email lists
    allEmailLists: [EmailList]

    # get one email list by a address
    getEmailList(address: String!): EmailList

    # get a member from an email list
    getEmailListMember(emailListAddress: String!, memberAddress: String!): Member

    # get all members from an email list
    getEmailListAllMembers(address: String!): [Member]
}

# should tell if an email list was changed and with the email list
type EmailListChanged {
    emailList: EmailList
    changed: Boolean!
}

# should tell if a member of an email list was changed and with the member object
type MemberChanged {
    member: Member
    changed: Boolean!
}

input MemberInput {
    name: String
    address: String!
    subscribed: Boolean
}

input MemberListInput {
    members: [MemberInput]
    subscribed: Boolean
}

type Mutation {
    addMembersToEmailList(emailListAddress: String!, memberList: MemberListInput): EmailListChanged
    removeMemberFromEmailList(memberAddress: String!): MemberChanged
}
`)

module.exports = Schema