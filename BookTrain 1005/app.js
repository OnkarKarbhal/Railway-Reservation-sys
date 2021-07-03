const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const ticket = require('./Routes/BookTrain');


const app = express()

app.use('/', ticket);

app.use(bodyParser.json())
app.use(cookieParser)

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
  servers: ["http://localhost:1005"]
  }
  },
  apis: ['./routes/BookTrain.js']
  
  };
  
  const swaggerDOC = swaggerJSDoc(swaggerOptions)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDOC));

const dbURI = "mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/ticket-DB?retryWrites=true&w=majority";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("DB Connected!");



app.listen(1005, ()=>{
  console.log('Server activated!')
});

