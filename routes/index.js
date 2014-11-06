var express = require('express');
var router = express.Router();

var model = require('../models/db');

var asMapModel = model.asMapModel;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


/*model.create({ url : 'http://a.com', link : 'index/a.jsp'  },function(err, doc){
	if(err){
		return next(err);
	}else{
		console.log(doc);
	}
});*/


// 获取列表
router.get('/list',function(req, res){

	asMapModel.find(function(err, docs){
		if(err){
			res.send({
				success : false,
				message : err
			});
		}else{
			res.send({
				success : true,
				message : 'ok',
				result : {
					list : docs
				}
			});
		}
	});

});

module.exports = router;
