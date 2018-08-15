(function() {
	 'use strict';
	 
	 app.controller('AppIndexCtrl',Grid);
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 
		//请求后台数据
//	     function getGridData(){
//	 		var sendData = {};
//	 		HttpUtils.post("/check/recheckTask.do" , sendData ,function (data) {
//	 			$scope.rows = data.data;
//	 		});
//	 	 }  
//	     getGridData();
	     
	 }
	
	
})();



