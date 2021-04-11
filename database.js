var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        db.run(`CREATE TABLE post (
            id INTEGER PRIMARY KEY,
            content text, 
            authorId text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insert = 'INSERT INTO post (content, authorId) VALUES (?,?)'
                db.run(insert, ["this is a sample post", "Michael"])
                
            }
        });
        db.run(`CREATE TABLE comment (
            id INTEGER PRIMARY KEY,
            content text, 
            authorId text, 
            postId INTEGER, 
            FOREIGN KEY (postId) REFERENCES Post(id)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insert = 'INSERT INTO comment (content, authorId, postId) VALUES (?,?,?)'
                db.run(insert, ["what a great post", "Tom", "1"])
                db.run(insert, ["nice post, dude", "Jerry", "1"])            }
        });  
        db.run(`CREATE TABLE like (
            id INTEGER PRIMARY KEY,
            postId INTEGER, 
            authorId text, 
            FOREIGN KEY (postId) REFERENCES Post(id)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insert = 'INSERT INTO like (postId, authorId) VALUES (?,?)'
                db.run(insert, [1, "Tom"])

            }
        });
    }
});


module.exports = db