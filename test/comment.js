require("./post")
const chai = require('chai')
    , should = chai.should();
const app = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Comment tests', () => {
    describe('GET api/comment', function() {
        it('returns all comments', function(done) {
            chai.request(app)
                .get('/api/comment')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.data.length.should.eql(2)
                responseBody.data[0].content.should.eql('what a great post')
                responseBody.data[0].authorId.should.eql('Tom')
                done();
                });
        });
    });

    describe('POST api/comment', function() {
        it('Create a comment', function(done) {
            chai.request(app)
                .post('/api/comment')
                .send({
                    postId: 1,
                    authorId: 'Jim',
                    content: "This is a comment"
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Jim')
                responseBody.data.content.should.eql('This is a comment')
                done();
                });
        });
    });

    describe('GET api/comment/3', function() {
        it('Get one comment', function(done) {
            chai.request(app)
                .get('/api/comment/3')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('success')
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Jim')
                responseBody.data.content.should.eql('This is a comment')
                done();
                });
            });
    });

    describe('PATCH api/comment', function() {
        it('Update a comment', function(done) {
            chai.request(app)
                .patch('/api/comment/3')
                .send({
                    postId: 1,
                    authorId: 'Jim',
                    content: "This is an edited comment"
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.postId.should.eql(1)
                responseBody.data.authorId.should.eql('Jim')
                responseBody.data.content.should.eql('This is an edited comment')
                done();
                });
        });
    });

    describe('DELETE api/comment', function() {
        it('delete a comment', function(done) {
            chai.request(app)
                .delete('/api/comment/3')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('deleted')
                done();
                });
            });
        });


});