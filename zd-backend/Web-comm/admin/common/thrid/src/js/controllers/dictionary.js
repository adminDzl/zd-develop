app.controller('dictionaryController', ['$scope', '$filter','editableOptions','editableThemes','$http',
  function($scope,$filter,editableOptions, editableThemes,$http){
	editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.dictionaries = new Array();
	$scope.b = new Array();
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
    
    $scope.dataDisplayName = '';

    /**列表**/
    $scope.cha = function (gg) {
    	var postData = {
    			pageNo: $scope.paginationConf.pageNo,
                pageSize: $scope.paginationConf.itemsPerPage,
                categoryValue: gg ? gg.value : '',
                dataDisplayName: $scope.dataDisplayName
           };
    	$http({
			method: 'POST',
			contentType: 'application/json',
			url: INTERFACE.p_sysdatadictionary_list,
			async: false,
			data: postData
		}).success(function(data) {
			$scope.datas = data.data;
			$scope.dictionaries = $scope.datas.rows;
	        $scope.totalItems = $scope.datas.total;
		});
    }
    
    $scope.cha();
    

	
    $scope.checkName = function(data, id){
        return data;
   };

   /**类别下拉选中**/
   $scope.showGroup = function(dic){
	   if(dic.categoryValue && $scope.b.length) {
	        var selected = $filter('filter')($scope.b, {value: dic.categoryValue});
	        return selected.length ? selected[0].label : '';
	      } else {
	        return dic.categoryDisplayName || '';
	      }
   };

   /**类别下拉内容**/
   $scope.type = function(){
	   $http({
			method: 'POST',
			contentType: 'application/json',
			url: INTERFACE.p_sysdatadictionary_type,
			async: false,
			data: {}
		}).success(function(data) {
	       $scope.groups = data;
	       
	       angular.forEach($scope.groups, function(a) {
	    	   $scope.b.push(a);
            });
		   
		});
   };
   $scope.type();

   /**搜索**/
   $scope.query = function(gg){
	   $scope.cha(gg);
   }
   
    

   /**新增**/
     $scope.adddictionary = function() {
         $scope.inserted = {
          // id: $scope.temps.length+1,
           dictionaryId: '',
           projectName: '',
           state: null,
           createPersonName: ''
         };
         $scope.dictionaries.push($scope.inserted);
    };

    /**保存**/
    $scope.savedictionary = function(obj, id) {
    	if(id == "" || id == null){
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_sysdatadictionary_add,
    			data: obj
    		}).success(function() {
    		    $scope.cha();
    		});
    	}else {
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_sysdatadictionary_update,
    			data: obj
    		}).success(function() {
    		    $scope.cha();
    		});
    	}
    	
       
      
     };


}]);
