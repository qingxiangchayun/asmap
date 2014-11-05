var express = require('express');
var router = express.Router();

var model = require('../models/db');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// 获取列表
router.get('/list',function(req, res){
	
	console.log(model);

	model.create({ name : 'asmap'},function(err, doc){
		if(err){
			return next(err);
		}else{
			res.send(doc);
		}
	})

	res.send({
		success : true,
		message : 'ok',
		result : {
			list : []
		}
	});
});

module.exports = router;
