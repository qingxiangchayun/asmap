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
  		//username : req.cookies.username
  	});
});

function handSendError(err){
	res.send({
		success : false,
		message : err
	});
}

function checkLogin(req, res ,next){
	var result = false;

	if(req.cookies.user){
		asUserModel.find({username : req.cookies.user} ,function(err, docs){
			if(err){
				handSendError(err);
			}else if(docs && docs[0] && docs[0].token === req.cookies.token){
				res.redirect('/');
			}else{
				next();
			}
		});

	}else{
		next();
	}
}

router.get('/login',checkLogin);

router.get('/login',function(req, res){
	res.render('login', { title: 'login' });
});

router.post('/ajaxlogin',function(req, res){
	var reqData = req.body;

	asUserModel.find({username : reqData.username },function(err, docs){
		if(err){
			handSendError(err);
		}else{
			if(docs && docs[0] && docs[0].password === reqData.password){
				// write cookie
				var md5 = crypto.createHash('md5');
				
				var cookie_asLoginToken = md5.update( reqData.username + Date.now() ).digest('hex');

				var expiresTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

				res.cookie('token',cookie_asLoginToken, { expires: expiresTime , path : '/' });
				res.cookie('user',reqData.username, { expires: expiresTime , path : '/' });

				asUserModel.update({username : reqData.username}, { $set : { token : cookie_asLoginToken } },function(err, docs){
					if(err){
						handSendError(err);
					}
				});

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

router.get('/reg',function(req, res){
	res.render('reg',{
		title : 'reg'
	});
});

router.post('/ajaxreg',function(req, res){
	asUserModel.find({username : req.body.username}, function(err, docs){
		var md5 = crypto.createHash('md5');
		var cookie_asLoginToken = md5.update( req.body.username + Date.now() ).digest('hex');

		if(err){
			handSendError(err);
		}else{
			if(docs && docs[0]){
				res.send({
					success : false,
					message : '用户名已经存在'
				});
			}else{
				asUserModel.create({
					username : req.body.username,
					password : req.body.password,
					token : cookie_asLoginToken
				},function(err, docs){
					if(err){
						handSendError(err);
					}else{
						res.send({
							success : true,
							message : 'ok'
						});
					}
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
