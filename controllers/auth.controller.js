const User = require('../models/user.model')
const {
    success,
    error
} = require('../lib/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')

async function register(req, res) {
    try {
        //Hash password
        let hash;
        try {
            hash = await bcrypt.hash(req.body.password, 10);            
        } catch (exception) {
            return error(res, 400, "785bfu62v", "Password pelik");
        }
        
        //Save user
        try {
            let newUser = await new User({
                email: req.body.email.trim().toLowerCase(),
                password: hash,
                name: req.body.name,
                age: req.body.age,
                city: req.body.city,
            }).save();
        } catch (exception) {
            console.error(exception)
            return error(res, 400, "88tgasbg", "User tak dapat daftar")
        }

        return success(res)
    } catch (exception) {
        return error(res, 400, "yuidb9s6", "Some error occur")
    }
}

async function login(req, res) {
    try {
        //Find user
        let user
        try {
            user = await User.findOne({email: req.body.email})
        } catch (exception) {
            console.error(exception)
            return error(res, 400, "88tgasbg", "Unknown email")
        }

        //Hash compare password
        let hashCompare;
        try {
            hashCompare = await bcrypt.compare(req.body.password, user.password);            
        } catch (exception) {
            return error(res, 400, "785bfu62v", "Password tidak diketahui");
        }

        if(hashCompare == false) return error(res, 400, "785bfu62v", "Password salah");
        
        //Refresh token
        let refreshToken
        try {
            refreshToken = await randomBytes(16).toString('hex');

            let currentToken = user.token
            currentToken.push(token)

            await User.updateOne({_id: user._id}, {token:currentToken})
        } catch (error) {
            return error(res, 400, "785bfu62v", "Tak boleh login");            
        }

        //Create access token
        let token
        try {
            token = await jwt.sign({id: user._id}, process.env.SECRET, {
                expiresIn: '30d'
            })
        } catch (error) {
            return error(res, 400, "785bfu62v", "Tak boleh login");
        }

        return success(res, {
            refresh: refreshToken,
            token: token
        })
    } catch (exception) {
        return error(res, 400, "yuidb9s6", "Some error occur")
    }
}

function refresh(req, res) {
    // Refresh token
    // Check database valid

    // Create access token
    let token
    try {
        token = await jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: '30d'
        })
    } catch (error) {
        return error(res, 400, "785bfu62v", "Tak boleh login");
    }
}

function revoke(req, res) {
    
}

module.exports = { register, login }