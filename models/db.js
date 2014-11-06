
// 数据库操作

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

db.on('error',console.error.bind(console,'error'));

var asMapSchema = new Schema({
	url : String,
	link : String
});

var asMapModel = db.model('asMapModel123',asMapSchema);

module.exports = {
	asMapModel : asMapModel
};



	

