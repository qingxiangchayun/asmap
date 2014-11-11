
// 数据库操作

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

db.on('error',console.error.bind(console,'error'));

var asMapSchema = new Schema({
	url : String,
	devUrl : String,
	path : String ,
	date : Date
});

var asUserShema = new Schema({
	username : String,
	password : String
});

var asMapModel = db.model('asMapModel',asMapSchema);
var asUserModel = db.model('asUserModel',asUserShema);

module.exports = {
	asMapModel : asMapModel,
	asUserModel : asUserModel
};



	

