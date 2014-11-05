
// 数据库操作

var mongoose = require('mongoose');
var db = mongoose.createConnection('192.168.3.133','test')


db.on('error',console.error.bind(console,'error'));

db.once('open',function(){
	console.log('db connect ok');

	var Schema = mongoose.Schema;

	var asMapSchema = new Schema({
		url : String,
		link : String
	});

	var asMapModel = mongoose.model('asMapModel',asMapSchema);


	module.exports = asMapModel

	
});
