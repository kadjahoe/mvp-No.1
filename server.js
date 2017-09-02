const express = require('express')
const next = require('next')

const dev = process.env.NODE_EV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const emailRouter = require('./serverRoutes/email')
const graphqlRouter = require('./serverRoutes/graphql')

app.prepare()
.then(() => {
    const server = express()

    server.use('/graphql', graphqlRouter())

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
