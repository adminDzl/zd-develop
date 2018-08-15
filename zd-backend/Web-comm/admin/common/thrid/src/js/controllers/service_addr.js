app.controller('projectController', ['$scope', '$filter','editableOptions','editableThemes','$http',
  function($scope,$filter,editableOptions, editableThemes,$http){
	editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.users = new Array();
    var config = {
    		pageSize : 10
    };
    $scope.paginationConf = {
    		pageNo: 1,
            itemsPerPage: config.pageSize
    };
    
    $scope.$watch('paginationConf.pageNo+paginationConf.itemsPerPage',function(){
    	$scope.cha();
    });

    /**列表**/
    $scope.cha = function () {
    	var postData = {
    			pageNo: $scope.paginationConf.pageNo,
                pageSize: $scope.paginationConf.itemsPerPage
           };
    	$http({
			method: 'POST',
			contentType: 'application/json',
			url: INTERFACE.p_project_list,
			async: false,
			data: postData
		}).success(function(data) {
			$scope.datas = data.data;
			$scope.users = $scope.datas.rows;
	        $scope.totalItems = $scope.datas.total;
		});
    }
    
    $scope.cha();
    

	
    $scope.checkName = function(data, id){
        return data;
   };
   
     

   /**新增**/
     $scope.addUser = function() {
         $scope.inserted = {
          // id: $scope.temps.length+1,
           projectCode: '',
           projectName: '',
           projectDevelop: '',
           projectProduct: '',
           state: null
         };
         $scope.users.push($scope.inserted);
    };

    /**保存**/
    $scope.saveuser = function(obj, id) {
    	if(id == "" || id == null){
    		$http({
    			method: 'POST',
    			//contentType: 'application/json',
    			url: INTERFACE.p_project_add,
    			data: obj
    		}).success(function() {
    			$scope.cha();
    		});
    	}else {
    		$http({
    			method: 'POST',
    			//headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
    			url: INTERFACE.p_project_update,
    			data: obj
    		}).success(function() {
    			$scope.cha();
    		});
    	}
    	
       
      
     };

     /**状态下拉与选中**/
     $scope.statuses = [
 				{value: '0', text: '开启'},
 				{value: '1', text: '关闭'}
                      ];
    $scope.showStatus = function(user) {
    	var selected = $filter('filter')($scope.statuses, {value: user.state});
        return (user.state && selected.length) ? selected[0].text : '开启';
      };
      
//      $scope.user = function(obj){
//          
//          var source = angular.copy(obj);
//          $scope.sourceId = source.id;
//          syncSourceService.listTemp(source.id,function(data){
//         	 $scope.user = data.data;
//          });
//            
//      };


    

}]);
