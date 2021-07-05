var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http')
var server = require('../app');

chai.should()
chai.use(chaiHttp);

describe('POST /auth', ()=>{
    describe("POST /resgister", ()=>{
        it("it should POST register", (done) => {
            const newregister = {
                name: "Aurobindo",
                email: "auro@bingo.com",
                password: "auro123"
            }
            chai.request(server)
            .post('/auth/register')
            .send(newregister)
            .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('Object');
            response.body.should.be.have.property("name").eq("Aurobindo");
            response.body.should.be.have.property('email');
        done()});
    });});

    describe("POST /login", ()=>{
        it("it should POST login", (done) => {
            const newlogin = {
                email:"shai@bingo.com",
                password:"shai123"
            }
            chai.request(server)
            .post('/auth/login')
            .send(newlogin)
            .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('Object');
        done()});
    });});
})