app.controller('versionController', ['$scope', '$filter','editableOptions','editableThemes','$http',
  function($scope,$filter,editableOptions, editableThemes,$http){
	editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.versions = new Array();
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
			url: INTERFACE.p_version_list,
			async: false,
			data: postData
		}).success(function(data) {
			$scope.datas = data.data;
			$scope.versions = $scope.datas.rows;
	        $scope.totalItems = $scope.datas.total;
		});
    }
    
    $scope.cha();
    

	
    $scope.checkName = function(data, id){
        return data;
   };
   
     

   /**新增**/
     $scope.addVersion = function() {
         $scope.inserted = {
          // id: $scope.temps.length+1,
           versionId: '',
           projectName: '',
           state: null,
           createPersonName: ''
         };
         $scope.versions.push($scope.inserted);
    };

    /**保存**/
    $scope.saveversion = function(obj, id) {
    	if(id == "" || id == null){
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_version_add,
    			data: obj
    		}).success(function() {
    		    $scope.cha();
    		});
    	}else {
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_version_update,
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
    $scope.showStatus = function(version) {
    	var selected = $filter('filter')($scope.statuses, {value: version.state});
        return (version.state && selected.length) ? selected[0].text : '开启';
      };
      

}]);
