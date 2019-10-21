const User = require('../models/user.model')
const {
    success,
    error
} = require('../lib/response')
const bcrypt = require('bcrypt')

function register(req, res) {
    try {
        //Find email - BUAT SENDIRI

        //Hash password
        try {
            let hash = await bcrypt.hash(req.body.password, 10);            
        } catch (exception) {
            return error(res, 400, "785bfu62v", "Password pelik");
        }
        
        //Save user
        try {
            let newUser = await new User({
                email: req.body.email,
                password: hash
            }).save();
        } catch (exception) {
            return error(res, 400, "88tgasbg", "User tak dapat daftar")
        }

        return success()
    } catch (exception) {
        return error()
    }
}

module.exports = { register }