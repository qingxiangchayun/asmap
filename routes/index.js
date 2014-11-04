var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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
