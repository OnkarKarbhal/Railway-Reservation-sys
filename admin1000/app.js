var express = require('express');
var trains = require('./routes/traindetails');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var app = express();
app.use('/admin',trains);



app.listen(1000, ()=>{console.log("server activated at " + 1000)});

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
    info: {
    title: 'Online Railway Reservation',
    description: 'Railway Reservation info',
    contact: {
    name: 'OnkarK'
    },
    servers: ["http://localhost:1000"]
    }
    },
    apis: ['routes/TrainDetails.js']
    
    };
    
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    module.exports = app;

