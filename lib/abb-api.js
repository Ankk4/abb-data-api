var request = require('request');
var async   = require('async');
var Promise = require('promise');
var colour = require('colour');

function RoboWeb (options) {
	this.options = options;
	 
    // API Paths  // move these to their own scope to avoid 'tempVars'?
	this.opts    = '?json=1';
	this.debug   = '?debug=1';
	this.baseUrl = options.uri;

	this.uidata = this.baseUrl + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/';
	this.log    = this.baseUrl + '/rw/elog/0' + this.opts + '&lang=fi&resource=title';

    this.system = [ this.baseUrl + '/rw/system/' + this.opts,
    				this.baseUrl + '/ctrl/clock/' + this.opts];

    this.state 	= [ this.baseUrl + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/' + '/nRunning/' + this.opts,
    				this.baseUrl + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/' + '/nStopped/' + this.opts, 
    				this.baseUrl + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/' + '/nError/' + this.opts,
    				this.baseUrl + '/rw/rapid/symbol/data/RAPID/T_ROB_L/smUIData/' + '/nTeach/' + this.opts];

    this.rapidState = this.baseUrl + '/rw/rapid/' + this.opts;

    this.get = function(uri, callback) {
    	options.uri = uri;
		request.get(options, function(error, response, body) {			
			if(!error && response) {
				body = JSON.parse(body);
				return callback(null, body);
			} else { console.log(error); }
		});
	};		
}

RoboWeb.prototype.subscribe = function() {	
	request
	  .post(this.options) // is this correct scope?
	  .on('response', function(error, response, body) {
		if(response.statusCode == 200) {
			console.log(body);
		}
	});
};

// Go through all the systems uri(s) and request.get for system data.
RoboWeb.prototype.getSystem = function() {
	var tempSys = this.system;
	var tempGet = this.get;
	var obj = {};

	async.parallel({
	    one: function (parallelCb) { 
	    	tempGet(tempSys[0], parallelCb); 
	    },
	    two: function (parallelCb) {
	    	tempGet(tempSys[1], parallelCb); 
	    }
	}, function(err, data) {
		obj.name            = data.one._embedded._state[0].name;
		obj.starttm         = data.one._embedded._state[0].starttm;
		obj.robotwareversio = data.one._embedded._state[0].rwversion;
		obj.clock           = data.two._embedded._state[0].datetime;
	});
	return obj;
};

RoboWeb.prototype.getState = function() {
	var tempState = this.state;
	var tempGet = this.get;

	async.parallel({
	    one: function (parallelCb) { 
	    	tempGet(tempState[0], parallelCb); 
	    },
	    two: function (parallelCb) {
	    	tempGet(tempState[1], parallelCb); 
	    },
	    three: function (parallelCb) {
	    	tempGet(tempState[2], parallelCb); 
	    },
	    four: function (parallelCb) {
	    	tempGet(tempState[3], parallelCb); 
	    }
	}, function(err, data) {
		var state = '';
		if(data.one._embedded._state[0].value > 0)
			state = 'Running';
		else if(data.two._embedded._state[0].value > 0)
			state = 'Stopped';
		else if(data.three._embedded._state[0].value > 0)
			state = 'Error';
		else if(data.four._embedded._state[0].value > 0)
			state = 'Teaching';

		return state;
	});
};

RoboWeb.prototype.getEventLog = function(callback) {
	var logAddr = this.log;
	var logObj = [];
	var itemsProcessed = 0;
	var tempGet = this.get;

	async.parallel({
		one: function (parallelCb) {
			tempGet(logAddr, parallelCb); 
		}
	}, function (err, data) {
		for (var i = data.one._embedded._state.length - 1; i >= 0; i--) {
			var event    = {};
			event.code   = 0;
			event.msg    = '';
			event.tstamp = '';	

			event.code   = data.one._embedded._state[i].code;
			event.msg    = data.one._embedded._state[i].title;
			event.tstamp = data.one._embedded._state[i].tstamp;

			itemsProcessed++;
			logObj.push(event);
		}

	    if(itemsProcessed === data.one._embedded._state.length) {
  			return logObj;
  		} 
	});	
};

module.exports = RoboWeb;