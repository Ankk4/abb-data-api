var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

// Schema - Log
var logModel = new Schema({
	msg: { type: String, required: true},
	code: { type: Number, required: true },
	robotime: { type: String },
},{
	timestamps: true
});

module.exports = mongoose.model('Log', logModel);