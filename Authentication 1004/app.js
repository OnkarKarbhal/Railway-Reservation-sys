var express = require('express');
var app = express();

//Import Routes
var authRoutes = require('./routes/authroutes');
app.use('/', authRoutes);


app.listen(4000, ()=>{
    console.log('Server ' + 4000 + " listening");
});