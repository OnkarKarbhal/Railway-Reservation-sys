var express = require('express');
var app = express();

//Import Routes
var authRoutes = require('./routes/authroutes');
app.use(authRoutes);


app.listen(1006, ()=>{
    console.log('Server ' + 1006 + " listening");
});