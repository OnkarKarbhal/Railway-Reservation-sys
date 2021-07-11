const mongoose = require('mongoose');

var TrainSchema = new mongoose.Schema({ 
          TrainName:{type:"string", 
          required: true}, 

          TrainNumber:{type: "string", 
          required: true},

          TrainSrc:{type:"string", 
          required: true}, 

          TrainDes:{type:"string", 
          required: true}

          

});

module.exports = mongoose.model('traindetails', TrainSchema);