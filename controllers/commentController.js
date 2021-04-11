var db = require("../database.js")

function list(req, res, next){
    if(!req.body.authorId){
        var sql = "select * from comment"
        var params = []
      }
      else {
        var sql = "select * from comment where authorId = ?"
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
    var sql = "select * from comment where id = ?"
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

function create(req, res, next) {
    var errors=[]
    if (!req.body.postId){
        errors.push("No post Id specified");
    }
    if (!req.body.authorId){
        errors.push("No author Id specified");
    }
    if (!req.body.content){
        errors.push("No comment body specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        postId: req.body.postId,
        authorId: req.body.authorId,
        content: req.body.content
    }
    var sql ='INSERT INTO comment (postId, authorId, content) VALUES (?,?,?)'
    var params =[data.postId, data.authorId, data.content]
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
        'DELETE FROM comment WHERE id = ?',
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
        postId: req.body.postId
    }
    db.run(
        `UPDATE comment set 
           content = ?, 
           authorId = ?,
           postId = ?
           WHERE id = ?`,
        [data.content, data.authorId, data.postId, req.params.id],
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

module.exports = {get, remove, update, create, list}