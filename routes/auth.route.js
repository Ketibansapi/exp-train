const router = require('express').Router()
const {
    register,
    login
} = require('../controllers/auth.controller')
const {
    registerSchema,
    loginSchema
} = require('../validators/auth.validator')
const checkValidation = require('../lib/checkValidation')

function authRouter(params) {
    router.post('/register', registerSchema, checkValidation, register)
    router.post('/login', loginSchema, checkValidation, login)

    return router
}

module.exports = authRouter