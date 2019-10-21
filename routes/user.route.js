const router = require('express').Router()
const {
    createUser,
    getAllUsers,
    getById,
    deleteUser,
    updateUser
} = require('../controllers/user.controller')

function userRouter(params) {
    router.post('/', createUser)
    router.get('/', getAllUsers)
    router.get('/:id', getById)
    router.delete('/:id', deleteUser)
    router.put('/:id', updateUser)

    return router
}

module.exports = userRouter