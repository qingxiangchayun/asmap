var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// 数据库操作

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.3.133:27017/asmap_db');


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
