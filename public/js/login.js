require(['jquery','md5','bootstrap'],function($,md5){

	'use strict';

	var $username = $('#J_username');
	var $password = $('#J_password');

	$('#J_loginBtn').on('click',function(){

		$.ajax({
			url : 'ajaxlogin',
			type : 'POST',
			dataType : 'json',
			data : {
				username : $username.val(),
				password : md5($password.val())
			},
			success : function(data){
				if(data.success){
					window.location.href="/";
				}else{
					alert(data.message);
				}
			}
		});

	});


});

