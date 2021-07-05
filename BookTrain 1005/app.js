const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const ticket = require('./Routes/BookTrain');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const app = express()
app.use('/', ticket);
app.use(bodyParser.json())
app.use(cookieParser)

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info:{
        title: 'Online Railway Reservation', 
        description: 'Railway Reservation info', 
        contact: {
          name: 'OnkarK'
        },
        server: ["http://localhost:1005"]}},

  apis: ['routes/*.js']
};
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const dbURI = "mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/ticket-DB?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("DB Connected!");

app.listen(1005, ()=>{
  console.log('Server activated on ' + 1005);
});

module.exports = app;

