const router = require('express').Router()
const {helloName, helloBody} = require('../controllers/hello.controller')

function helloRouter(params) {
    router.get('/:name', helloName)
    router.get('/', helloName)
    router.get('/body', helloBody)
    return router
}

module.exports = helloRouter