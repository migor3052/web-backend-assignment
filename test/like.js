require("./comment")
const chai = require('chai')
    , should = chai.should();
const app = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Like tests', () => {
    describe('GET api/like', function() {
        it('returns all likes', function(done) {
            chai.request(app)
                .get('/api/like')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.data.length.should.eql(1)
                responseBody.data[0].postId.should.eql(1)
                responseBody.data[0].authorId.should.eql('Tom')
                done();
                });
            });
    });


    describe('POST api/like', function() {
        it('Create a like', function(done) {
            chai.request(app)
                .post('/api/like')
                .send({
                    postId: 1,
                    authorId: 'Jim'
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Jim')
                done();
                });
        });
    });

    describe('GET api/like/2', function() {
        it('Get one like', function(done) {
            chai.request(app)
                .get('/api/like/2')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('success')
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Jim')
                done();
                });
            });
    });

    describe('PATCH api/like', function() {
        it('Update a like', function(done) {
            chai.request(app)
                .patch('/api/like/2')
                .send({
                    postId: 1,
                    authorId: 'Tim'
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Tim')
                done();
                });
        });
    });

    describe('DELETE api/like', function() {
        it('delete a like', function(done) {
            chai.request(app)
                .delete('/api/like/2')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('deleted')
                done();
                });
            });
        });


});
