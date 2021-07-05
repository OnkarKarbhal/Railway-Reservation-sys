var express = require('express');
var app = express();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');

const swaggerOptions={
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Railway Reservation system',
            version: '1.0.0',
            description: 'Online booking of railway tickets',
            contact:{
                name: 'By: Onkar K'
            },
            servers:["http://localhost:1004"]
        }
    },
    apis:['routes/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Import Routes
var authRoutes = require('./routes/authroutes');
app.use('/auth',authRoutes);


app.listen(1004, ()=>{
    console.log('Server ' + 1004 + " listening");
});