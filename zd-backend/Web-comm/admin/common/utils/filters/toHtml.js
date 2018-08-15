/**
 * luozhd  过滤器 HTML转义
 * @returns
 */
(function(){
	'use strict'
	app.filter("to_trusted",['$sce',function($sce){
		
		return function(text) {
            return $sce.trustAsHtml(text);
        };
				
	}]);	
})()