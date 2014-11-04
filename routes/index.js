var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// 数据库操作

var mongoose = require('mongoose');
//mongoose.connect('mongodb://192.168.3.133:27017/asmap_db');
var db = mongoose.createConnecton('mongodb://192.168.3.133:27017','asmap_db')

//var db = mongoose.connection;

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


// 获取列表
router.get('/list',function(req, res){
	res.send({
		success : true,
		message : 'ok',
		result : {
			list : []
		}
	});
});

module.exports = router;
