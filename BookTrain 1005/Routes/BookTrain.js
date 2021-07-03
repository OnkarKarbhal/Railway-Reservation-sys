var express = require('express');
var router = express.Router();
var bookticket = require('../Model/ticketSchema');
var authMiddle = require('../../Middleware/authmiddleware');
//var cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

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

router.post('/book-ticket', authMiddle , (req, res)=>{
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
            res.status(400).json({ message: "Booking not successfull"});
        })    
})
    
    //const SeatsQuantity = parseInt(req.body.quantity);
    //const date = parseInt(req.body.quantity);
    //const booking_id = Math.random().toString(36).substr(2, 5);

module.exports = router;

