const express = require('express')
const next = require('next')

const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const Schema = require('./data/schema')
const Resolvers = require('./data/resolvers')

const dev = process.env.NODE_EV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const emailRouter = require('./serverRoutes/email')

app.prepare()
.then(() => {
    const server = express()

    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.use('/graphql', graphqlHTTP({
        schema: Schema,
        rootValue: Resolvers,
        // rootValue: root,
        graphiql: true,
      }))

    server.use('/email', emailRouter(app))

    server.get ('/post/:id', (req, res) => {
        const actualPage = '/post'
        const queryParams = {id: req.params.id}
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req,res) => {
        return handle(req,res)
    })

    server.listen (3000, (err) => {
        if (err) throw err
        console.log('> Ready on HTTP://localhost:3000')
    })
})

.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})
