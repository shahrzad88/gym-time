'use strict';
var express = require('express');
var mysql = require("mysql");
var app = express();
var path = require('path');
console.log(__dirname + '/index.html');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // probably want to put index/css/calendar in a separate dir like Public/


// Database Configuration
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "gymdb"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


// Serve the index.html calendar webpage
app.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.sendFile('index.html');
    res.end();
});

// Create an appointment
app.post('/create', function(req, res) {
    
    connection.query('INSERT INTO events SET ?',req.body.event, function(err, result) {
        if (err) {
            return console.error('error running query', err);
        }
    });

    res.set('Content-Type', 'application/JSON');
    res.write(req.body.event);
    res.status(200);
    res.end();
});

// Get all appointments
//app.get('/read', function(req, res) {
       
//    connection.query('SELECT * FROM events',function(err, result) {
//       if (err) {
//           return console.error('error running query', err);
//        }
//        res.set('Content-Type', 'text/plain');
//        console.log("GET rows: " + JSON.stringify(result.rows));
//        res.write(JSON.stringify(result.rows));
//        res.status(200);
//        res.end();
//    });
//});

// Reset appointment book to just first two appointments
app.get('/reset', function(req, res) {
    
    connection.query('DELETE * FROM events', function(err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        res.set('Content-Type', 'text/plain');
        console.log("DELETE rows: " + JSON.stringify(result.rows));
        res.write(JSON.stringify(result.rows));

        res.status(200);
        res.end();
    });
});

app.listen(process.env.PORT || 8080 || 80);
