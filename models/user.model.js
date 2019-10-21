const mongoose = require('../mongodb')

const User = mongoose.model('User', {
    name: String,
    age: Number
})

module.exports = User