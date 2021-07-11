var express = require('express');
var trains = require('./Routes/traindetails')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
    info: {
    title: 'Online Railway Reservation',
    description: 'Online booking of railway tickets',
    contact: {
    name: 'By: OnkarK'
    },
    servers: ["http://localhost:1000"]
    }
    },
    apis: ['routes/*.js']
    
    };
    
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    

var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/admin',trains);

app.listen(1000, ()=>{console.log("server activated at " + 1000)});

module.exports = app;

