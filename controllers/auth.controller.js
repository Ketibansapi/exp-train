const User = require('../models/user.model')
const {
    success,
    error
} = require('../lib/response')
const bcrypt = require('bcrypt')

function register(req, res) {
    try {
        //Find email

        //Hash password
        try {
            let hash = await bcrypt.hash(req.body.password, 10);            
        } catch (exception) {
            return error(res, 400, "Password pelik");
        }
        
        //Save user
        try {
            let newUser = await new User({
                email: req.body.email,
                password: hash
            }).save();
        } catch (exception) {
            return error(res, 400, "User tak dapat daftar")
        }

        return success()
    } catch (exception) {
        return error()
    }
}