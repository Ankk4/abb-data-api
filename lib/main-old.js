var fs         = require('fs');
var request    = require('request');
var request    = request.defaults({jar: true});
var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var WebSocket  = require('ws');
var wsAddr     = "";

var DATA       = [];

// API Paths
/*var base        = 'http://172.31.9.212'
    opts        = '?json=1',
    uidata      = base + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/',
    status      = base + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/sStatusMessage/' + opts,
    system      = base + '/rw/system' + opts,
    state       = [
        uidata + '/nStopped/' + opts,
        uidata + '/nError/' + opts,
        uidata + '/nTeach/' + opts
    ],
    system = [
                base + '/rw/system/' + opts,
                base + '/ctrl/clock/' + opts
            ],
    log    = base + '/rw/elog/0' + opts + '&lang=fi&resource=title';
*/

/*var optionsJson = {
    method: 'POST',
    url: 'http://172.31.9.212/subscription?',
    headers: [{
          name: 'content-type',
          value: 'application/json'
    }],
    postData: {
        mimeType: 'application/json',
        params: [{
            name: 'resources',
            value: '1'
        },{
            name: '1',
            value: 'rw/elog/0'
        },{
            name: '1-p',
            value: '1'
        }]
    },
    auth: {
        'user': 'Default User',
        'pass': 'robotics',
        sendImmediately: false
    },
};
*/
var optionsForm = {
    method: 'POST',
    host: '172.31.9.212',
    url: 'http://172.31.9.212/subscription',
    multipart: false, 
    headers: [{
        name: 'content-type',
        value: 'application/x-www-form-urlencoded'
    }],
    form: {'resources': '1', '1': '/rw/elog/0', '1-p': '1'},
    auth: {
        'user': 'Default User',
        'pass': 'robotics',
        sendImmediately: false
    }
};

   request(optionsForm, function(error, response, body){
        if (!error && response.statusCode == 201 || response.statusCode == 200){
            console.log('body : ' + body);
        }
        else{
            console.log('Code : ' + response.statusCode);
            console.log('error : ' + error);
            console.log('body : ' + body);
        }
    });

/*request(optionsJson, function (error, httpResponse, body) {
    console.log("\n\n-------------------------------------------\n\n");
    console.log(httpResponse);
    console.log(error);
    console.log("\n\n-------------------------------------------\n\n");
});*/


/*request.get({uri: base + '/rw/retcode', auth: { 'user': 'Default User', 'pass': 'robotics', sendImmediately: false } }, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log("\n\n-------------------------------------------\n\n");
  console.log(body);
});
*/

/*// Create ws subscription - first post the requested values
options.url    = 'http://172.31.9.212/subscription?debug=1';
//options.body   = 'resources=1&1=/rw/elog/0&1-p=1'
console.log(options);

request.post(options, function (error, response, body) {
    if(error)
        console.log("INTERNAL SYSTEM ERROR", error);
    else if (response.statusCode =! 200)
        console.log("SERVER SYSTEM ERROR", response.statusCode);
    else {
        var location = body;

        console.log(location);
        //console.log(response);
}*/
/*
    var wsOpt = {
        contentType: 'application/x-www-form-urlencoded',
        //auth: { 'user': 'Default User', 'pass': 'robotics' },
        //'set-cookie': response.headers["set-cookie"],
    };

    var ws = new WebSocket('ws:172.31.9.212/subscription', null, wsOpt);

    ws.on('open', function open() {
        ws.send('something');
        console.log("Real-time connection to Overlord open.");
    });
         
    ws.on('message', function(data, flags) {
        console.log(data);
    });
});*/






/*// Express apps
app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, '../'), {index: 'index.html'}));

app.get('/', function(req, res) {
    options.uri = 'http://172.31.9.212/rw/iosystem/signals/EtherNetIP/Hand_L/hand_StatusVacuum2_L?json=1';
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var j = JSON.parse(body);
            res.send(j._embedded._state[0].name + " - " + j._embedded._state[0].lvalue);
            c
        }
        else {
            res.send(error);
            console.log(body);
        }
    });
});

app.get('/subs', function(req, res) {
    options.uri = 'http://172.31.9.212/subscription';
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var j = JSON.parse(body);
            res.send(j);
        }
        else {
            res.send(error);
        }
    });
});


app.listen(8080, function(){
    console.log("Running on port: " + 8080);
}); 
*/