const mongoose = require('../mongodb')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    age: Number,
    city: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

module.exports = User