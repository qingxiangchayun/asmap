require(['jquery','bootstrap','jquery.tmpl'],function($){

	var $table = $('#J_table');

	var trTmpl = [
		'<tr {{if $item.isAdd}} class="add-edit-tr" {{/if}} data-id="${_id}">',
			'<td>${id}</td>',
			'<td {{if $item.isAdd}} contenteditable="true" {{/if}} class="edit-txtarea url">${url}</td>',
			'<td {{if $item.isAdd}} contenteditable="true" {{/if}} class="edit-txtarea devUrl">${devUrl}</td>',
			'<td {{if $item.isAdd}} contenteditable="true" {{/if}} class="edit-txtarea path">${path}</td>',
			'<td>${date}</td>',
			'<td class="action">',
				'<a class="edit-btn" data-isedit="false" href="javascript:;">{{if $item.isAdd}}保存{{else}}修改{{/if}}</a>',
				'<a class="delete-btn" href="javascript:;">删除</a>',
			'</td>',
		'</tr>'
	].join('');

	var getList = function(config) {

		var config = config || {};

		// 请求列表数据
		$.ajax({
			url: 'list',
			type : 'GET',
			dataType: 'json',
			data : {
				url : config.key
			},
			success: function(data) {
				if (data.success && data.result && data.result.list) {
					var dataArr = data.result.list;
					var resultArr = [];

					$table.find('tbody').empty();

					$.tmpl(trTmpl,dataArr).prependTo($table.find('tbody'));


				} else {
					alert(data.message);
				}
			}
		});

	};

	getList();

	// add
	$('#J_addBtn').on('click', function() {
		var data = {}

		$.tmpl(trTmpl,data,{
			isAdd : true
		}).prependTo($table.find('tbody'));
	});

	// edit
	$table.on('click','.edit-btn',function(){
		var $this = $(this);
		var $parentsTr = $this.parents('tr');
		var id = $parentsTr.data('id');

		var params = {
			url : $parentsTr.find('.url').html(),
			devUrl : $parentsTr.find('.devUrl').html(),
			path : $parentsTr.find('.path').html()
		};

		if(id){
			params.id = id;
		}


		if($this.html() == '修改'){
			$this.html('保存');

			$parentsTr.addClass('add-edit-tr').find('.edit-txtarea').attr('contenteditable',true);

		}else{
			$this.html('修改');
			$parentsTr.removeClass('add-edit-tr');

			$.ajax({
				url : 'list/edit',
				type: 'GET',
				dataType : 'json',
				data : params,
				success : function(data){
					if(!data.success){
						alert(data.message);
					}
				}
			});
		}
	});

	// delete
	$table.on('click','.delete-btn',function(){
		var $this = $(this);
		var $parentsTr = $this.parents('tr');
		var id = $parentsTr.data('id');

		if(id){
			$.ajax({
				url : 'list/delete',
				type : 'GET',
				dateType : 'json',
				data : {
					id : id
				},
				success : function(data){
					if(data.success){
						$parentsTr.remove();
					}else{
						alert(data.message);
					}
				}
			});
		}else{
			$parentsTr.remove();
		}
	});

	// search
	$('#J_searchBtn').on('click',function(){
		var searchKey = $.trim($('.search-key').val());
		if(searchKey){
			getList({
				key : searchKey
			});
		}
	});

});

