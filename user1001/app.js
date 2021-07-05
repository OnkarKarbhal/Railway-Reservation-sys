var express = require('express');
var user = require('./Routes/user');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var app = express();
app.use('/', user);

app.listen(1001, ()=>{console.log("server activated " + 1001)});

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
    servers: ["http://localhost:1001"]
    }
    },
    apis: ['routes/*js']
    
    };
    
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    //console.log(swaggerDocs)

    module.exports  = app;

