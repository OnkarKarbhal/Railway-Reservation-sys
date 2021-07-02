const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSch = new mongoose.Schema({


    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },

    Mobileno: { type: Number }
});


module.exports = mongoose.model('users', userSch);