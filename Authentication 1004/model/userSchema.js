var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true
    },

    // date:{
    //     type: Date,
    //     default: Date.now,
    //     required: true
    // }
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user', userSchema);

