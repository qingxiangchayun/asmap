
// 数据库操作

var mongoose = require('mongoose');
var db = mongoose.createConnecton('mongodb://192.168.3.133:27017','asmap_db')


db.on('error',console.error.bind(console,'连接错误');

db.once('open',function(){
	console.log('db connect ok');
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ASMap = new Schema({
	id : ObjectId,
	url : String,
	link : String,
	date : Date
});


module.exports = db;
