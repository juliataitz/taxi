var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
//var dbconfig = require('opsworks'); //[1] Include database connection data
// Connect string to MySQL
var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'cis550.czrs05s7rxjm.us-east-2.rds.amazonaws.com',
  user     : 'cis550nyctaxi',
  password : 'jjor2018',
  port     : '3306',
  database : 'CIS550'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/borough', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'borough.html'));
});

router.get('/zone', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'zone.html'));
});

// Two routes to set up dropdown menu and submit button
router.get('/borough/show_boroughs', function(req, res) {
	var query = 'SELECT name FROM Borough';
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			res.json(rows);
		}
	});
});

module.exports = router;










