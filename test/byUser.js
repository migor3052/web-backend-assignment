require("./like")
const chai = require('chai')
    , should = chai.should();
const app = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('By User Queries tests', () => {
    describe('GET api/post/', function() {
        it('gets all posts by Michael', function(done) {
            chai.request(app)
                .get('/api/post')
                .send({
                    authorId: 'Michael',
                })
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

    describe('GET api/comment/', function() {
        it('gets all comments by Tom', function(done) {
            chai.request(app)
                .get('/api/comment')
                .send({
                    authorId: 'Tom',
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.data.length.should.eql(1)
                responseBody.data[0].content.should.eql('what a great post')
                responseBody.data[0].authorId.should.eql('Tom')
                responseBody.data[0].postId.should.eql(1)
                done();
                });
        });
    });

    describe('GET api/like/', function() {
        it('gets all likes by Tom', function(done) {
            chai.request(app)
                .get('/api/like')
                .send({
                    authorId: 'Tom',
                })
                .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body
                responseBody.data.length.should.eql(1)
                responseBody.data[0].authorId.should.eql('Tom')
                responseBody.data[0].postId.should.eql(1)
                done();
                });
        });
    });
});