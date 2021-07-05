const Stripe = require('stripe');
const express = require('express');
const payment = express();

payment.use(express.json());
const stripe = Stripe(`sk_test_51J9P4sSJf8AA0UHDfOuY9HySNZFubiaxIayWWE3oxoq450liWqBo9zSBqiQ3IaAtZoHDjvhAHJtyNQiYsBOm84q1002qyrHqs0`);
payment.post('/payment', async (req, res) => {
    try {
        console.log(req.body); 
        const amount = req.body.amount*100;
        const email = req.body.email;
        await stripe.charges.create({
            amount: amount,
            currency: "inr",
            source: "tok_mastercard",
            metadata: { 'order_id': '6565' }
        }, function (err, result) {
            console.log(result.amount/100);
            //console.log(err);
            res.send(`payment succesful for ${email}`);
        })      
    } catch (err) {
        console.log(err);
    }
})

module.exports = payment.listen(1006,()=>{
    console.log("Server activated!");
})


