const {
    checkSchema
  } = require('express-validator')
  const User = require('../models/user.model')
  
  let registerSchema = checkSchema({
    email: {
      // Custom validators
      custom: {
        errorMessage: 'Email already used',
        options: async (value, {
          req,
          location,
          path
        }) => {
          let userReg = await User.find({
            email: req.body.email.trim().toLowerCase()
          })
          if (userReg.length != 0) throw new Error("Email used")
  
          return true
        }
      },
    },
    password: {
      isLength: {
        errorMessage: 'Password should be at least 7 chars long',
        // Multiple options would be expressed as an array
        options: {
          min: 7
        }
      }
    }
  })
  
  let loginSchema = checkSchema({
    email: {
      isEmail: {
        errorMessage: "Email not valid"
      },
      custom: {
        errorMessage: 'User not found',
        options: async (value, {
          req,
          location,
          path
        }) => {
          let userReg = await User.find({
            email: req.body.email.trim().toLowerCase()
          })
          if (userReg.length == 0) throw new Error("User not found")
  
          return true
        }
      },
    }
  })
  
  module.exports = {
    registerSchema,
    loginSchema
  }