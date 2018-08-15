/**
 * lvyao
 */
(function(){
	'use strict'
	
	app.directive('ePopover',function($compile){
		return {
			restrict:'EA',
			templateUrl:'../nsAdmin/repairs/totalorder/popover.html',
			scope:{
				title:'=eTitle',
				dataContent:'=eContent',
				type:'=eType',
				otherdata:'=eOtherdata',
				action:"&eAction",
			},
			link:function(scope,element,attr){
				
				scope.$watch('otherdata',function(t){
					popo();
				});

				
				scope.$watch('title',function(t){
					popo();
				});
				
				scope.$watch('dataContent',function(c){
					popo();
				});
				
				scope.$watch('type',function(t){
					popo();
				});
				
				function popo(){
					angular.element("[data-toggle='popover']").popover();
				}
			}
		};
	});
})()