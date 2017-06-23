var path = require('path');

var authCtrl = function() {

	// Get front page
	var get = function(req, res) { 
        var page = path.join(__dirname, '../../public/index.html');
	    res.sendFile(page);
    };

	return {
			get: get
	};
};

module.exports = authCtrl;
