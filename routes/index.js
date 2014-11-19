var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var model = require('../models/db');

var asMapModel = model.asMapModel;
var asUserModel = model.asUserModel;

router.get('/', checkLogin);

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', {
  		title: 'Express', 
  		user : {
  			username : req.cookies.user
  		}
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
				if(req.path !== '/'){
					res.redirect('/');
				}else{
					next();
				}
			}else{
				if(req.path !== '/login'){
					res.redirect('/login')	
				}else{
					next();
				}
			}
		});

	}else if(req.path == '/reg' || req.path == '/login' ){
		next();
	}else{
		res.redirect('login');
	}
}

router.get('/login',checkLogin);

router.get('/login',function(req, res){
	res.render('login', { title: 'login' });
});

router.get('/logout',function(req, res){
	res.clearCookie('token');
	res.clearCookie('user');

	res.redirect('login');
});

function loginSucCallback(req, res){
	var md5 = crypto.createHash('md5');
				
	var cookie_asLoginToken = md5.update( req.body.username + Date.now() ).digest('hex');

	var expiresTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

	res.cookie('token',cookie_asLoginToken, { expires: expiresTime , path : '/' });
	res.cookie('user',req.body.username, { expires: expiresTime , path : '/' });

	asUserModel.update({username : req.body.username}, { $set : { token : cookie_asLoginToken } },function(err, docs){
		if(err){
			handSendError(err);
		}
	});
}

router.post('/ajaxlogin',function(req, res){
	var reqData = req.body;

	asUserModel.find({username : reqData.username },function(err, docs){
		if(err){
			handSendError(err);
		}else{
			if(docs && docs[0] && docs[0].password === reqData.password){
				// write cookie
				loginSucCallback(req, res);

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
						loginSucCallback(req, res);
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
