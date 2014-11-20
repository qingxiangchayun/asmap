;(function($){

	'use strict';

	$.Pagination = function(options){

		var defaultOpts = {
			num_page : 0,
			items_per_page : 10,
			current_page : 0,
			link_to : 'javascript:;',
			prev_text : '&gt;',
			next_text : '&lt' ,
			ellipse_test : '...',
			prev_show_always : true,
			next_show_always : true
			load_first_page : true,
			callback : function(){
				return false;
			}
		};


	};


	
})(jQuery);
