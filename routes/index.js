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

// Two routes to set up dropdown menu and submit button for zones
router.get('/zone/show_zones', function(req, res) {
  var query = 'SELECT zone FROM Place';
  connection.query(query, function(err, rows, fields) {
    if(err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/zone/:zone/:weather', function(req, res) {
  var zone = req.params.zone;
  console.log(zone);

  var weather = req.params.weather;
  console.log(weather);

  var query = '';
  if (weather == 'Snow') {
    query = 'select * from (select count(distinct t.tripId) as snow_p from CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.2) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where zone = \'' + zone + '\') as snowp, (select count(distinct t.tripId) as snow_d from CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.2) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where zone = \'' + zone + '\') as snowd';
  } else if (weather == 'Rain') {
    query = 'select * from (select count(distinct t.tripId) as rain_p from CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where zone = \'' + zone + '\') as rainp, (select count(distinct t.tripId) as rain_d from CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where zone = \'' + zone + '\') as raind';
  } else if (weather == 'Hot') {
    query = 'select * from (select count(distinct t.tripId) as hot_p from CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where zone = \'' + zone + '\') as hotp, (select count(distinct t.tripId) as hot_d from CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where zone = \'' + zone + '\') as hotd';
  } else if (weather == 'Cold') {
    query = 'select * from (select count(distinct t.tripId) as cold_p from CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where zone = \'' + zone + '\') as coldp, (select count(distinct t.tripId) as cold_d from CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where zone = \'' + zone + '\') as coldd';
  } else if (weather == 'Windy') {
    query = 'select * from (select count(distinct t.tripId) as wind_p from CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where zone = \'' + zone + '\') as windp, (select count(distinct t.tripId) as wind_d from CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where zone = \'' + zone + '\') as windd';
  }

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});


// Two routes to set up dropdown menu and submit button for boroughs
router.get('/borough/show_boroughs', function(req, res) {
  var query = 'SELECT name FROM Borough';
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

// Router for submit button on borough
router.get('/borough/:borough/:weather', function(req, res) {
  var borough = req.params.borough;
  console.log(borough);

  var weather = req.params.weather;
  console.log(weather);

  var query = '';
  if (weather == 'Snow') {
    // Insert query that gets snow pickup and dropoff totals and per capita
    // query = 'SELECT count(distinct t.tripId) as snow_p FROM Trip t INNER JOIN Weather w on t.timePickup between w.d and DATE_ADD(w.d, INTERVAL 1 HOUR) LEFT JOIN Place p on t.puId = p.locationId WHERE borough = \'' + borough + '\' and snowfall > .05';
    //changed queries to acount for discrepancy in hours which are raining vs hours that are snowing....
    //still 
    query = 'select * from (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as snow_p from CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where borough = \'' + borough + '\') as snowp, (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as snow_d from CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where borough = \'' + borough + '\') as snowd, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as snow_ppc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as snowppc, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as snow_dpc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as snowdpc';
  } else if (weather == 'Rain') {
    query = 'select * from (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as rain_p from CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where borough = \'' + borough + '\') as rainp, (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as rain_d from CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where borough = \'' + borough + '\') as raind, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as rain_ppc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as rainppc, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as rain_dpc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where precipitation - snowfall > 0.1) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as raindpc';
  } else if (weather == 'Hot') {
    query = 'select * from (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as hot_p from CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where borough = \'' + borough + '\') as hotp, (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as hot_d from CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where borough = \'' + borough + '\') as hotd, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as hot_ppc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as hotppc, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as hot_dpc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where temp > 80) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as hotdpc';
  } else if (weather == 'Cold') {
    query = 'select * from (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as cold_p from CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where borough = \'' + borough + '\') as coldp, (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as cold_d from CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where borough = \'' + borough + '\') as coldd, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as cold_ppc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as coldppc, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as cold_dpc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where temp < 30) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as colddpc';
  } else if (weather == 'Windy') {
    query = 'select * from (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as wind_p from CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where borough = \'' + borough + '\') as windp, (select Round(count(distinct t.tripId)*500*24/case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end, 2) as wind_d from CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where borough = \'' + borough + '\') as windd, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as wind_ppc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.puId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as windppc, (select Round(count(distinct t.tripId)*24*500*100 / (b.population * case when count(distinct w1.d) = 0 then 1 else count(distinct w1.d) end), 2) as wind_dpc from CIS550.Borough b, CIS550.Trip t inner join (select * from CIS550.Weather w where wind > 25) w1 on t.timePickup between w1.d and DATE_ADD(w1.d, INTERVAL 1 HOUR) left join CIS550.Place p on t.dropId = p.locationId where p.borough = \'' + borough + '\' and b.name = \'' + borough + '\') as winddpc';
  }

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/show/:snow_min/:snow_max/:rain_min/:rain_max/:temp_min/:temp_max/:wind_min/:wind_max', function(req,res) {
  //Use req.body for post requests
  var query = 'select round(avg(t.total), 2) as total, round(avg(t.fareAmt), 2) as fare, round(avg(t.tip), 2) as tip, round(100*avg(t.tip)/ avg(t.fareAmt), 2) as tippct, round(avg(t.dist), 2) as distance, round(avg(MINUTE(TIMEDIFF(t.timeDropoff,t.timePickup))), 2) as time from CIS550.Trip t inner join CIS550.Weather w on t.timePickup between w.d and DATE_ADD(w.d, INTERVAL 1 HOUR) where snowfall between ' + req.params.snow_min + ' and ' + req.params.snow_max + ' and  precipitation - snowfall between ' + req.params.rain_min + ' and ' + req.params.rain_max + ' and wind between ' + req.params.wind_min + ' and ' + req.params.wind_max + ' and temp between ' + req.params.temp_min + ' and ' + req.params.temp_max;

 
  // var query = 
  // 'select avg(t.total), avg(t.fareAmt), avg(t.tip),  100*avg(t.tip)/ avg(t.fareAmt) as tippct, avg(t.dist), avg(MINUTE(TIMEDIFF(t.timeDropoff,t.timePickup))) from CIS550.Trip t inner join CIS550.Weather w on t.timePickup between w.d and DATE_ADD(w.d, INTERVAL 1 HOUR) where snowfall between ' + req.body.snow-min + ' and ' + req.body.snow-max + ' and  precipitation - snowfall between ' + req.body.rain-min + ' and ' + req.body.rain-max + ' and wind between ' + req.body.wind-min + ' and ' + req.body.wind-max + ' and temp between ' + req.body.temp-min + ' and ' + req.body.temp-max;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
        console.log("Output Values from Query:")
        console.log(rows);
    }  
    });
});

module.exports = router;
