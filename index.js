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


var server = app.listen(process.env.PORT, process.env.IP, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });

// app.get('...
