const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const { graphqlExpress } = require('graphql-server-express')
const { createExpressContext } = require('apollo-resolvers')
const { formatError: apolloFormatError } = require('apollo-errors')
const { GraphQLError } = require('graphql/error')
const { graphiqlExpress } = require('apollo-server-express')

const UserModel = require('../data/models/UserModel')

const { UnknownError } = require('../data/schema/errors')

const schema = require('../data/schema')

const { authenticate } = require('../authenticate')

const formatError = error => {
    let e = apolloFormatError(error);
  
    if (e instanceof GraphQLError) {
      e = apolloFormatError(new UnknownError({
        data: {
          originalMessage: e.message,
          originalError: e.name
        }
      }));
    }
  
    return e;
  };

module.exports = () => {

    const router = express.Router();

    router.use(cors())
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: true }))

    router.use((req, res, next) => {
        // get user data from either session or basic auth, etc
        req.user = authenticate({ username: 'stephon', password: 'basic' })
        next()
    })
    router.use('/interactive', graphiqlExpress({
        endpointURL: '/graphql'
    }))
    router.use('/', graphqlExpress((req, res) => {
        const user = req.user

        const models = {
            User: new UserModel(user)
        }

        const context = createExpressContext({
            models,
            user
        }, res)

        return {
            schema,
            formatError,
            context
        }
    }))

    return router;
}