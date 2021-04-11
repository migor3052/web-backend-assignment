const chai = require('chai')
    , should = chai.should();
const app = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Post tests', () => {

    describe('GET api/post', function() {
    it('returns all posts', function(done) {
        chai.request(app)
            .get('/api/post')
            .end((err, res) => {
            res.should.have.status(200);
            const responseBody = res.body
            responseBody.data.length.should.eql(1)
            responseBody.data[0].content.should.eql('this is a sample post')
            responseBody.data[0].authorId.should.eql('Michael')
            done();
            });
    });
    });

    describe('POST api/post', function() {
        it('Create a post', function(done) {
            chai.request(app)
                .post('/api/post')
                .send({
                    authorId: 'Tom',
                    content: "This is a post"
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.authorId.should.eql('Tom')
                responseBody.data.content.should.eql('This is a post')
                done();
                });
        });
    });

    describe('GET api/post/2', function() {
        it('Get one post', function(done) {
            chai.request(app)
                .get('/api/post/2')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('success')
                responseBody.data.authorId.should.eql('Tom')
                responseBody.data.content.should.eql('This is a post')
                done();
                });
            });
    });

    describe('PATCH api/post', function() {
        it('Update a post', function(done) {
            chai.request(app)
                .patch('/api/post/2')
                .send({
                    authorId: 'Tom',
                    content: "This is an edited post"
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql("success")
                responseBody.data.authorId.should.eql('Tom')
                responseBody.data.content.should.eql('This is an edited post')
                done();
                });
        });
    });

    describe('DELETE api/post', function() {
        it('delete a post', function(done) {
            chai.request(app)
                .delete('/api/post/2')
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.message.should.eql('deleted')
                done();
                });
            });
    });


});