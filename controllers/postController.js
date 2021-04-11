var db = require("../database.js")

function list(req, res, next){
      
      if(!req.body.authorId){
        var sql = "select * from post"
        var params = []
      }
      else {
        var sql = "select * from post where authorId = ?"
        var params = [req.body.authorId]
      }
      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
          "message":"success",
          "data":rows
        })
      })
}

function get(req, res, next){
    var sql = "select * from post where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
}

function likes(req, res, next){
    var sql = "select authorId from like where postId = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
}

function comments(req, res, next){
    var sql = "select * from comment where postId = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
}

function create(req, res, next) {
        var errors=[]
        if (!req.body.content){
            errors.push("No post content specified");
        }
        if (!req.body.authorId){
            errors.push("No author Id specified");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        var data = {
            content: req.body.content,
            authorId: req.body.authorId,
        }
        var sql ='INSERT INTO post (content, authorId) VALUES (?,?)'
        var params =[data.content, data.authorId]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
}

function remove(req, res, next) {
    db.run(
        'DELETE FROM post WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });

}

function update(req, res, next) {
    var data = {
        content: req.body.content,
        authorId: req.body.authorId,
    }
    db.run(
        `UPDATE post set 
           content = ?, 
           authorId = ?
           WHERE id = ?`,
        [data.content, data.authorId, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
}

module.exports = {get, remove, update, create, list, likes, comments}