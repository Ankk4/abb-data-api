var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

// Schema - User
var yumiModel = new Schema({
	name:			{ type: String, required: true},
	robotwareversio:{ type: String },
	description: 	{ type: String },		
	eventLog: 		[{ type: Schema.Types.ObjectId, ref: 'Log' }]
},{
	timestamps: 	true
});

module.exports = mongoose.model('Yumi', yumiModel);