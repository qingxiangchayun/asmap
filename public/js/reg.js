require(['jquery','md5','bootstrap'],function($,md5){

	'use strict';

	var $username = $('#J_username');
	var $password = $('#J_password');
	var $passwordRepeat = $('#J_password_repeat');

	$('#J_register').on('click',function(){

		if($password.val() !== $passwordRepeat.val()){
			$('.alert-danger').html('两次输入密码不一致！').show();
			return;
		}

		$.ajax({
			url : 'ajaxreg',
			type : 'POST',
			dataType : 'json',
			data : {
				username : $username.val(),
				password : md5($password.val()),
				passwordRepeat : md5($passwordRepeat.val())
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

