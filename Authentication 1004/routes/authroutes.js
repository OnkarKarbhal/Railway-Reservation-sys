const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

//IMPORT ROUTES
const User = require("../model/userSchema");
const Admin = require('../model/adminSchema');
const { registerschema, loginschema } = require("./Validation");

router.use(express.json());

//Connect to DB
const dbURI =
  "mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("DB Connected!");

         

/**
 * @swagger
 * /register:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested user
 * 
*/

// Add new user - register
router.post("/register", async (req, res) => {
  const { error } = registerschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  console.log(emailExist);
  if (emailExist)
    return res.status(400).json({ message: "Email already exist!" });

  User.create(req.body).then((newdata) => {
      res.send({ newdata });
    }).catch((err) => {
      console.log(err);
    });
});


//JWT token 
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'OnkarK', {
        expiresIn: maxAge
    })
}

/**
 * @swagger
 * /login:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested user
 * 
*/

//user login
router.post("/login", async (req, res) => {

  //Validate
  const { error } = loginschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check for exisiting Email ID
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send({ message: " Email does not exist!" });
  //res.json({ userid: emailExist._id });

  //Create token and auth
  const token = createToken(User._id)
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  console.log(token);

  res.send("Login successful");
});


// Add new Admin - register
router.post('/admin-register', async (req, res) => {
  const { error } = registerschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await Admin.findOne({ email: req.body.email });
  console.log(emailExist);
  if (emailExist)
    return res.status(400).json({ message: "Email already exist!" });

  Admin.create(req.body).then((newdata) => {
      res.send({ newdata });
    }).catch((err) => {
      console.log(err);
    });
});

//Admin login
router.post("/admin-login", async (req, res) => {

  //Validate
  const { error } = loginschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check for exisiting Email ID
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send({ message: " Email does not exist!" });
  //res.json({ userid: emailExist._id });

  //Create token and auth
  const token = createToken(Admin._id, usertype.Admin)
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  console.log(token);

  res.send("Login successful");
});


module.exports = router;
