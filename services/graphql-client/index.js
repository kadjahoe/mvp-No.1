import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:3000/graphql'

const graphqlClient = new GraphQLClient(endpoint)

export default graphqlClient