var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var router = express.Router();
var UserSchema = require("../Model/UserSchema");
//var TrainSchema = require("../../admin1000/Model/TrainSchema");
router.use(express.json());

var trainDBURI = "mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/AuthDB?retryWrites=true&w=majority";
mongoose.connect(trainDBURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
console.log("TrainDB connected");

/**
 *  @swagger
 *  /{id}:
 *  get:
 *      summary: "To get the list of all trains"
 *      parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *      responses:
 *          '200':
 *              description: A successful response
 */

//GET Train List By ID
router.get("/:id", (req, res) => {
  axios.get("http://localhost:1000/admin/" + req.paramas.id).then((response) => {
      res.send(response.data);
    }).catch((err) => {
      if (err) {
        throw err;
      }
    });
});

router.get("/", (req, res) => {
  var trainquery = req.query.TrainName;
  var trainfind = trainquery.split(" ");
  axios.get("http://localhost:1000/admin/train-name?TrainName=" + trainfind[0] + "%20" + trainfind[1]).then((response) => {
      res.send(response.data);
    }).catch((err) => {
      if (err) {
        throw err;
      }
    });
});


/**
 * @swagger
 * /{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *             schema:
 *                type: object
 *     responses:
 *         200:
 *           description: put train by ID
 */

//PUT user data
router.put("/:id", (req, res) => {
  console.log(req.params.id, req.body);
  UserSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then((response) => {
    UserSchema.findOne({ _id: req.params.id })
        res.send(response)})
      .catch((err) => {
        res.json({ message: err.message });
      });
  });

//Delete user data
router.delete("/:id", (req, res) => {
  console.log(req.params.id, req.body);
  UserSchema.findByIdAndDelete({ _id: req.params.id }, req.body).then((response) => {
    res.send(response)}).catch((err) => {
        res.json({ message: err.message });
      });
  });

module.exports = router;
