const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        match: /.+@.+\..+/,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;