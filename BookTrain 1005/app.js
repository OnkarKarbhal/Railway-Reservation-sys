const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const ticket = require('./Routes/BookTrain');
const cookieParser = require('cookie-parser');



app.use('/', ticket);

app.use(bodyParser.json())
app.use(cookieParser)

const dbURI =
  "mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/ticket-DB?retryWrites=true&w=majority";

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
