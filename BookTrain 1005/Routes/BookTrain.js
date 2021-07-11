var express = require('express');
var router = express.Router();
var bookticket = require('../Model/ticketSchema');
var payment = require('../../Payment/payment');
var authMiddle = require('../../Middleware/authmiddleware');
const cookieParser = require('cookie-parser');
const axios = require('axios')

router.use(express.json());
router.use(cookieParser());

/**
 * @swagger
 * /book-ticket:
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

router.post('/book-ticket' , authMiddle, (req, res)=>{
    console.log(req.body);
    const book_ticket = new bookticket({
        trainName : req.body.trainName,
        trainNumber: req.body.trainNumber,
        seatsQuantity: req.body.seatsQuantity
    });
    
    book_ticket.save()
        .then((result)=>{
            res.status(200).send(`Booking Successful`);
        })
        .catch((err)=>{
            res.status(400).json({ message: "Booking not successful"});
        })    
})

router.post('/billing', (req, res)=>{
    axios.post("http://localhost:1006/payment", req.body)
    .then((response)=>{
    console.log(response.data)
    res.send(response.data);
}).catch((error)=>{
    console.log(error)});
})

module.exports = router;

