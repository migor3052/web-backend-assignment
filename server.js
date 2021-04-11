// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

var commentRoute = require('./routes/comment')
app.use('/api/comment', commentRoute)

var likeRoute = require('./routes/like')
app.use('/api/like', likeRoute)

var postLike = require('./routes/post')
app.use('/api/post', postLike)
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.use(function(req, res){
    res.status(404);
});

module.exports = app;