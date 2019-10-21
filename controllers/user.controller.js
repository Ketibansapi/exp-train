const User = require('../models/user.model')
const {
    success,
    error
} = require('../lib/response')

async function createUser(req, res) {
    try {
        let newUser = await new User(req.body).save()
        return success(res, newUser)
    } catch (exception) {
        return error(res, 400, 'Bad Request')
    }
}

async function getAllUsers(req, res) {
    try {
        let users = await User.find();

        return success(res, users)
    } catch (error) {
        res.status(400).json({})
    }
}

async function getById(req, res) {
    try {
        let users = await User.findById(req.params.id);

        return success(res, users)
    } catch (error) {
        res.status(400).json({})
    }
}

async function getByName(req, res) {
    try {
        let users = await User.find({
            name: req.body.name
        });

        return success(res, users)
    } catch (error) {
        res.status(400).json({})
    }
}

async function deleteUser(req, res) {
    try {
        let users = await User.deleteOne({
            id: req.params.id
        });

        return success(res, users)
    } catch (error) {
        res.status(400).json({})
    }
}

async function updateUser(req, res) {
    try {
        let users = await User.updateOne({
            id: req.params.id
        }, req.body);

        return success(res, users)
    } catch (error) {
        res.status(400).json({})
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getById,
    deleteUser,
    updateUser
}