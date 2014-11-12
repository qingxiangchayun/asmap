var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var model = require('../models/db');

var asMapModel = model.asMapModel;
var asUserModel = model.asUserModel;

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', {
  		title: 'Express' 
  		//username : req.cookie.username
  	});
});

function handSendError(err){
	res.send({
		success : false,
		message : err
	});
}

router.get('/login',function(req, res){
	res.render('login', { title: 'login' });
});

router.post('/ajaxlogin',function(req, res){
	var reqData = req.body;

	asUserModel.find({username : reqData.username },function(err, docs){
		if(err){
			handSendError(err);
		}else{
			if(docs && docs[0] && docs[0].password == reqData.password){
				// write cookie
				var md5 = crypto.createHash('md5');
				
				var cookie_asLoginAuth = md5.update( reqData.username + Date.now() ).digest('hex');
				res.cookie('loginAuth',cookie_asLoginAuth, { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) , path : '/' });

				res.send({
					success : true,
					message : 'ok'
				});

			}else{
				res.send({
					success : false,
					message : '用户名密码错误'
				});
			}
		}
	});

});


// get list
router.get('/list',function(req, res){
	asMapModel.find({ url : new RegExp(req.query.url,'g') },function(err, docs){
		

		if(err){
			handSendError(err);
		}else{
			asMapModel.count(function(err, count){

				res.send({
					success : true,
					message : 'ok',
					totalCount : count,
					result : {
						list : docs
					}
				});
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
