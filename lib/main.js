var fs         = require('fs');
var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();
var Promise = require('promise');
var colour = require('colour');

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/gameapi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'.red));
db.once('open', function() { 
    console.log("Database connected."); 
});

// Initialize data models
var Yumi = require('../models/yumi.js');
var Log = require('../models/log.js');

var options = {
    method: 'POST',
    host: '172.31.9.212',
    uri: 'http://172.31.9.212',
    headers: [{
        name: 'content-type',
        value: 'application/json'
    }],
    auth: {
        'user': 'Default User',
        'pass': 'robotics',
        sendImmediately: false
    }
};

var RoboWeb = require('./abb-api.js');
var roboweb = new RoboWeb(options);

var systemData = roboweb.getSystem();
var stateData  = roboweb.getState(); // only for real time display
var logData    = roboweb.getEventLog(function(data) {
    console.log("DATA ARRIVED TO MAIN.JS");
    console.log(JSON.stringify(data));

}); // Capped collection

/*logData.forEach( function (value, index, array) {
    console.log(index);
    console.log("WUT");
});*/

var yumi = new Yumi ( {
    name:            systemData.name,
    robotwareversio: systemData.robotwareversio,  
});

// Express apps
app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, '../'), {index: 'index.html'}));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(8080, function(){
    console.log("Running on port: " + 8080);
}); 
