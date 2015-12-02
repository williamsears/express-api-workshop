var express = require('express');
var bodyParser = require('body-parser');
var db = require('mysql');


var connection = db.createConnection({
    user: 'williamsears',
    host: '127.0.0.1',
    database: 'addressbook'
});

var app = express();
app.use(bodyParser.json());

app.use(function(request, response, next){
    request.accountId = 1;
    next();
});

app.get('/', function(req, res) {
    connection.query("SELECT * FROM Account WHERE id=1", function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
    });
});
app.get('/AddressBooks', function(req, res) {
    connection.query("select * from AddressBook", function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
    });
});
app.get('/AddressBooks/:id', function(req, res) {
    var ident = req.params.id;
    connection.query("select * from AddressBook where id=" + req.params.id, function(err, rows) {
        if (err) throw err;
    if (rows.length === 0){
        res.status(400).send("No matches found!");
    } else {
    res.send(rows);
    }
    });
});
app.post('/AddressBooks', function(req, res) {
     if (!req.body.name) {
         res.status(404).send()
     }
     else {
          connection.query("INSERT into AddressBook (accountId, name) values ("+req.accountId+",'"+req.body.name+"')", function(err, rows) {
              if (err) throw err;
              console.log(rows);
          });
     }
});
app.delete('/AddressBooks/:id', function(req, res) {
    if (parseInt(req.params.id) === req.accountId) {
       connection.query("DELETE FROM AddressBook WHERE id =" + req.params.id, function(err, rows) {
           if (err) throw err;
           console.log("DeleteSuccess")
       });
    } else {
        console.log("Sorry you do not have the permissions to delete this")
    }
    
});


var server = app.listen(process.env.PORT, process.env.IP, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });

// app.get('...
