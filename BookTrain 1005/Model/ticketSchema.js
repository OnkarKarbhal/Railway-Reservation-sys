var mongoose = require('mongoose');

var ticket = new mongoose.Schema({
    trainName:{
        type: String,
        required: true
    },

    trainNumber:{
        type: String,
        required: true
    },

    seatsQuantity:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('ticket', ticket);
