
var $table = $('#J_table');

// 请求列表数据
$.ajax({
	url : 'list',
	dataType : 'json',
	success : function(data){
		if(data.success && data.result && data.result.list){
			var dataArr = data.result.list;
			var resultArr = [];

			dataArr.forEach(function(value,index,array){

				var html = [
					'<tr>',
		    			'<td>id</td>',
		    			'<td>url</td>',
		    			'<td>link</td>',
		    			'<td>jsp path</td>',
		    			'<td>date</td>',
		    			'<td>action</td>',
		    		'</tr>'
				].join('');

				resultArr.push(html);
			});

			$table.find('tbody').empty().append(resultArr.join(''));


		}else{
			alert(data.message);
		}
	}
});
