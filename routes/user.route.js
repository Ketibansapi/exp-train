const router = require('express').Router()
const {
    createUser,
    getAllUsers,
    getById,
    deleteUser,
    updateUser
} = require('../controllers/user.controller')
const jwtLib = require('../lib/jwtLib')

function userRouter(params) {
    router.post('/', createUser)
    router.get('/', getAllUsers)
    router.get('/:id', jwtLib, getById)
    router.delete('/:id', deleteUser)
    router.put('/:id', updateUser)

    return router
}

module.exports = userRouter