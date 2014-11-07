
// 数据库操作

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

db.on('error',console.error.bind(console,'error'));

var asMapSchema = new Schema({
	url : String,
	devUrl : String,
	path : String,
	date : Date
});

var asMapModel = db.model('asMapModel',asMapSchema);

module.exports = {
	asMapModel : asMapModel
};



	

