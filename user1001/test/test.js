var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('/Test USER', ()=>{
    /**
     * GET by Id
     */

    describe('GET /:id', ()=>{
        it("it should not get train by id", (done)=>{
            const userID = "60cc71c1dbbc9724bce52785"
            chai.request(server)
            .get(`/user/${userID}`)
            .end((err, response) => {
                response.should.have.status(404);
                //response.body.should.be.a('array');
                //response.body.should.be.have.property('_id')
            done();
        });});
    });

    

    describe("PUT /updateuser", () => {
        it("it should PUT train", (done) => {
            const userID = "60de20b2249d3435707a3763" ;
            const updateUser = {
                name:"Snehal Karbhal",
                email:"seh@gmail.com"
            };
            chai.request(server)
                .put('/'+ userID)
                .send(updateUser)
                .end((err, response) => {
                response.should.have.status(200);
            done();
            })
        })
    })
})





    
