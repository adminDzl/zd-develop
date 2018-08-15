app.controller('moduleController', ['$scope', '$filter','editableOptions','editableThemes','$http',
  function($scope,$filter,editableOptions, editableThemes,$http){
	editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.modules = new Array();
	$scope.c = new Array();
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
    
    $scope.moduleName = "";
    $scope.Id = "";
    /**列表**/
    $scope.cha = function () {
    	if($scope.Id.id=="" || $scope.Id.id==null){
    		$scope.Id.id="";
    	}
    	var postData = {
    			pageNo: $scope.paginationConf.pageNo,
                pageSize: $scope.paginationConf.itemsPerPage,
                name: $scope.moduleName,
                projectId: $scope.Id.id
           };
    	$http({
			method: 'POST',
			contentType: 'application/json',
			url: INTERFACE.p_module_list,
			async: false,
			data: postData
		}).success(function(data) {
			$scope.datas = data.data;
			for(var i=0;i<$scope.datas.rows.length;i++){
				$scope.datas.rows[i].show=true;
		    }
			$scope.modules = $scope.datas.rows;
	        $scope.totalItems = $scope.datas.total;
		});
    }
    
    $scope.cha();

    /**搜索**/
    $scope.query = function(){
    	$scope.cha();
    }

    /**项目名称下拉选中**/
    $scope.showGroup = function(module){
 	   if(module.projectId && $scope.c.length) {
 	        var selected = $filter('filter')($scope.c, {id: module.projectId});
 	        return selected.length ? selected[0].projectName : '';
 	      } else {
 	        return module.projectName || '';
 	      }
    };

    /**项目名称下拉内容**/
    $scope.list = function(){
    	$http({
			method: 'POST',
			contentType: 'application/json',
			url: INTERFACE.p_project_list,
			async: false,
			data: {}
		}).success(function(data) {
			$scope.datas = data.data;
			$scope.names = $scope.datas.rows;
			angular.forEach($scope.names, function(id) {
	    	   $scope.c.push(id);
            });
		});
    }
    $scope.list();
	
    $scope.checkName = function(data, id){
        return data;
   };
   
     

   /**新增**/
     $scope.addmodule = function() {
         $scope.inserted = {
          // id: $scope.temps.length+1,
           moduleId: '',
           projectName: '',
           state: null,
           createPersonName: ''
         };
         $scope.modules.push($scope.inserted);
    };
    

    /**修改**/
    $scope.edit = function(obj,index){
    	obj.$show();
    	$scope.modules[index].show = false;
    }

    /**取消**/
    $scope.cancel = function(obj,index){
    	obj.$cancel();
    	$scope.modules[index].show = true;
    }

    /**保存**/
    $scope.savemodule = function(obj,id,index,_this) {
    	if(id == "" || id == null){
        	obj.startTime = $("#startTime").val();
        	obj.endTime = $("#endTime").val();
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_module_add,
    			data: obj
    		}).success(function() {
    		    $scope.cha();
    		});
    	}else {
        	obj.startTime = $("#startTime"+id).val();
        	obj.endTime = $("#endTime"+id).val();
    		$http({
    			method: 'POST',
    			url: INTERFACE.p_module_update,
    			data: obj
    		}).success(function() {
    		    $scope.cha();
    		});
    	}
    	
		$scope.modules[index].show=true;
    	
     };

     /**状态下拉与选中**/
     $scope.statuses = [
 				{value: 1, text: '开启'},
 				{value: 2, text: '关闭'}
                      ];
    $scope.showStatus = function(module) {
    	var selected = $filter('filter')($scope.statuses, {value: module.status});
        return (module.status && selected.length) ? selected[0].text : '开启';
      };
      
    

}]);