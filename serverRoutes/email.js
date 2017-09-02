const express = require('express');
const router = express.Router();

module.exports = (app) => {
    
    router.get('/lists', (req, res) => {
        const actualPage = '/lists'
        app.render(req, res, actualPage, {})
    })

    router.get('/lists/:address/members', (req, res) => {
        const actualPage = '/members'
        const queryParams = { address: req.params.address }
        app.render(req, res, actualPage, queryParams)
    })

    return router
}