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
module.exports = router;


router.get('/show/:snow-min/:snow-max/:rain-min/:rain-max/:temp-min/:temp-max/:wind-min/:wind-max', function(req,res) {
  //Use req.body for post requests

 
	var query = 
	'select avg(t.total), avg(t.fareAmt), avg(t.tip),  100*avg(t.tip)/ avg(t.fareAmt) as tippct, avg(t.dist), avg(MINUTE(TIMEDIFF(t.timeDropoff,t.timePickup))) from CIS550.Trip t inner join CIS550.Weather w on t.timePickup between w.d and DATE_ADD(w.d, INTERVAL 1 HOUR) where snowfall between ' + req.body.snow-min + ' and ' + req.body.snow-max + ' and  precipitation - snowfall between ' + req.body.rain-min + ' and ' + req.body.rain-max + ' and wind between ' + req.body.wind-min + ' and ' + req.body.wind-max + ' and temp between ' + req.body.temp-min + ' and ' + req.body.temp-max;
	console.log(query);


  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});