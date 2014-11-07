var express = require('express');
var router = express.Router();

var model = require('../models/db');

var asMapModel = model.asMapModel;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// get list
router.get('/list',function(req, res){
	asMapModel.find({ url : new RegExp(req.query.url,'g') },function(err, docs){
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

// add or edit 
router.get('/list/edit',function(req, res){
	var reqQuery = req.query;

	var data = {
		url : reqQuery.url,
		devUrl : reqQuery.devUrl,
		path : reqQuery.path,
		date : new Date()
	};

	var updataCallback = function(err, docs){
		if(err){
			res.send({
				success : false,
				message : err
			});
		}else{
			res.send({
				success : true,
				message : 'ok'
			});
		}
	};

	
	if(reqQuery.id){ // eidt
		asMapModel.update({_id:reqQuery.id},{ $set : data },updataCallback);
	}else{ //add
		asMapModel.create(data,updataCallback);
	}

});

// delete
router.get('/list/delete',function(req, res){
	asMapModel.remove({_id : req.query.id},function(err, docs){
		if(err){
			res.send({
				success : false,
				message : err
			});
		}else{
			res.send({
				success : true,
				message : 'ok'
			});
		}
	});
});


module.exports = router;
