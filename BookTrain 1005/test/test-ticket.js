var chai = require('chai');
const {response} = require('express');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var server = require('../app');

chai.should();
chai.use(chaiHttp);

describe("book-ticket", ()=>{
    describe("POST /", () => {
        it("it should POST ticket", (done) => {
            const bookticket = {
                trainName: "Himalayan Queen",
                trainNumber: "HQ2124",
                seatsQuantity: 2
                };
                chai.request(server)
                    .post("/book-ticket")
                    .send(bookticket)
                    .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('Object');
                    //response.body.should.be.have.property('trainName').eq("Himalayan Queen");
                    // response.body.should.be.have.property('trainNumber');
                    // response.body.should.be.have.property('seatsQuantity');
                done();
                })
            })
        })


})