var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
//var dbconfig = require('opsworks'); //[1] Include database connection data
// Connect string to MySQL
var mysql = require('mysql');

// app.engine('html', require('ejs').renderFile);
// app.locals.hostname = dbconfig.db['cis550.czrs05s7rxjm.us-east-2.rds.amazonaws.com'];
// app.locals.username = dbconfig.db['cis550nyctaxi'];
// app.locals.password = dbconfig.db['jjor2018'];
// app.locals.port = dbconfig.db['3306'];
// app.locals.database = dbconfig.db['CIS550'];
// app.locals.connectionerror = 'successful';
// app.locals.databases = '';
var connection = mysql.createConnection({
  host     : 'cis550.czrs05s7rxjm.us-east-2.rds.amazonaws.com',
  user     : 'cis550nyctaxi',
  password : 'jjor2018',
  port     : '3306',
  database : 'CIS550'
});

// var connection = mysql.createConnection({
//     host: dbconfig.db['cis550.czrs05s7rxjm.us-east-2.rds.amazonaws.com'],
//     user: dbconfig.db['cis550nyctaxi'],
//     password: dbconfig.db['jjor2018'],
//     port: dbconfig.db['3306'],
//     database: dbconfig.db['CIS550']
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


module.exports = router;