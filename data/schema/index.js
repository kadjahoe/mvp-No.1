const { makeExecutableSchema } = require('graphql-tools')
const { resolvers: emailResolvers, types: emailTypes } = require('./email')
const { combineResolvers } = require('apollo-resolvers')

const rootTypes = `
schema {
    query: Query
    mutation: Mutation
}
`

const RootResolver = {}

const resolvers = combineResolvers([
    RootResolver,
    emailResolvers
])

const schema = makeExecutableSchema({
    typeDefs: [rootTypes, ...emailTypes],
    resolvers
})

module.exports = schema