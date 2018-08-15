(function() {
	 'use strict';
	 
	 app.controller('CrmRoomGrid',PageGrid);
	 
	 var editCtrl = "CrmRoomEdit";
	 app.controller(editCtrl,PageEdit);

	 var schemaObjBase = '/crm/room/schemaObj/';
	 var base = '/crm/room/';
	 var editUrl = '../admin/pages/crm/room/room/panel_edit.html';
	 var dictBase = '/crm/common/dict/';
	 
	 var excelBase = '/baseinfo/open/excelhead/';
	 var roomSchemaBase = '/crm/schemaRoom/';
	 
	 function PageGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,DataUtils,schemaChoose){
	 	
		 $scope.url = base + 'grid';

		 //页面模式：1.'grid' 查看房源列表  2.'move' 移动房间
		 $scope.mode = 'grid';
		 
		 $scope.schemaObj={};
		 $scope.schemaObjTree={};
		 $scope.schemaObjList=[];
		 initGrid();
	     function initGrid(){
			 var sendData = {};
			 HttpUtils.get( schemaObjBase + 'list', sendData ,function (response) {
			 	var schemaObjList = response.data;
			 	$.each(schemaObjList,function(i,e){
			 		e.expanded=true;
			 	});
		 		schemaObjList = DataUtils.parseTree(schemaObjList,'parentId','name');
		 		$scope.schemaObjList = [{id:"",label:"全部",children:schemaObjList,expanded:true}];
			 });
	     }
	     $scope.onNodeSelect = function(schemaObj) {
	    	 switch($scope.mode){
	    	 case 'grid':
	    		 $scope.schemaObj = schemaObj;break;
	    	 case 'move':
	    		 moveRoomTo(schemaObj);
	    		 break;
	    	 }
	     }
	     // 配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize + schemaObj.id', function () {
	    	 getGridData();
	 	 });
	     
	     // 请求后台数据
	     function getGridData(){
		 	var sendData = {
				schemaObjId: $scope.schemaObj.id,
				searchKeys: $scope.searchKeys,
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize
			};
		 	HttpUtils.get($scope.url, sendData ,function (data) {
		 		$scope.paginationConf.totalItems =data.data.page.total;
		 		$scope.rows = data.data.page.rows;
		 	});
	 	 }

	     // 搜索
	     $scope.search = function (e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     // 新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "initEdit",sendData,function (response) {
		    	var site = {};  

		    	site.schemaObjId = $scope.schemaObj.id;
		    	
		    	site.data = response.data;
	 			site.title = '新增';
	 			site.code = 1;
	 			site.url =  editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	 	 
	     // 修改
	     $scope.update = function (id) {
	    	var sendData = {id:id};
	 		HttpUtils.get(base + "initEdit",sendData,function (response) {
	 			var site = {};
	 			site.data = response.data;
	 			site.title = '编辑';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     $scope.id=null;
	     $scope.gridMode = function(){
		    $scope.id=null;
			$scope.mode = 'grid';
		 };
	     $scope.moveMode = function(id){
	    	$scope.id=id;
		    $scope.mode = 'move';
	     }
	     function moveRoomTo(schemaObj){
	    	if($.trim(schemaObj.id)==''){
				ModalCtrl.show('提示','请选择有效的目录！',modalCode.warning);
				return;
	    	}
			var sendData = {id:$scope.id, schemaObjId:schemaObj.id};
			HttpUtils.post( base + 'updateBelong',sendData,function () {
	    		$scope.schemaObj = schemaObj;
				ModalCtrl.show('提示','修改成功！',modalCode.success);
		    	$scope.mode = 'grid';
			});
	     }
	     // 删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 			});
	 		});
	 	 };
	 	 
	 	 //切换状态（冻结、开放）
	     $scope.updateSwitch = function(id) {
		 		var sendData = {'id':id};
		 		HttpUtils.post(base +  'updateSwitch',sendData,function (data) {
		 				getGridData();
		 				ModalCtrl.show('提示','修改成功！',modalCode.success);
		 		});
		 };
	     

	     //下载模板
	     $scope.toDataDownload = function(){
	    	 schemaChoose.choose(function(selected){
		    	 var sendData={schemaId:selected.id};
				 HttpUtils.get(roomSchemaBase + "initImport",sendData,function (response) {
				    	var modelCode = response.data.modelCode;
				    	location.href= excelBase+"excelTempExport?modelCode="+modelCode+"&parkId="+response.data.parkId;
				 });
	    	 });
	     };

		   //导入数据
	     $scope.importSchema={};
		 $scope.toDataImport = function(){
	    	 schemaChoose.choose(function(selected){
	    	     $scope.importSchema=selected;
	    	     
	    		 	$('#dataImport').modal(); 
		         var fileInput = document.getElementById("fileInput");
		     	// for IE, Opera, Safari, Chrome
		          if (fileInput.outerHTML) {
		              fileInput.outerHTML = fileInput.outerHTML;
		          } else { // FF(包括3.5)
		              fileInput.value = "";
		          }
	    	 });
		 };
		     
		 $scope.dataImport=function(){
			 	if($.trim($scope.importSchema.id)==''){
			    	ModalCtrl.show('提示','未选择导入到的层级',modalCode.error);
			 		return;
			 	}
		    	var sendData={schemaId:$scope.importSchema.id};
				HttpUtils.get(roomSchemaBase + "initImport",sendData,function (response) {
				    	var modelCode = response.data.modelCode;



						var fd = new FormData();
				        var file = document.querySelector('input[type=file]').files[0];
				        
				        if(!file){
				        	Utils.showTip(false,"请上传文件！");	
				        	return;
				        }
				        console.log(file);
				        fd.append('file', file); 
				        fd.append('modelCode', modelCode);
				        $http({
					        method:'POST',
					        url:roomSchemaBase + "import",
					        data: fd,
					        headers:{Authorization:localStorage.token,'Content-Type':undefined},
					        transformRequest: angular.identity 
				        }).success( function ( response ){
				        	 //上传成功的操作
						    if(response.result){
						    	$('#dataImport').modal("hide"); 
					    		 getGridData();
					    		 ModalCtrl.show('提示',response.message,modalCode.success);
						    }else{
						    	ModalCtrl.show('提示',response.message,modalCode.error);
						    }
				        })
				});
			}
		 	
	 }
     // 打开页面
	 function open(site,$modal) {
    	$modal.open({
 			templateUrl:site.url+'?v='+new Date().getTime(),
 			controller: site.ctrl,
 			controllerAs:'mm',
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
     }


		function PageEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
			$scope.form = {useStatus:'1',rentFlag:'1',saleFlag:'1'};// 清空表单数据
			//$scope.site为外部引用参数对象 1为新增 2为修改
			$scope.site = site;
			if(site.code == 1){
				$scope.form.schemaObjId = site.schemaObjId;
			}
			if(site.code == 2){
				$scope.form = angular.copy(site.data.entity);
				$scope.form.useStatus = $scope.form.useStatus+'';
				$scope.form.rentFlag = $scope.form.rentFlag+'';
				$scope.form.saleFlag = $scope.form.saleFlag+'';
			};

			$scope.addSave = function () {
				if(site.code == 1){
					var sendData = angular.copy($scope.form);
					HttpUtils.post(base + 'addSave',sendData,function (data) {
						$scope.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
						$modalInstance.close();
					});
				}else if(site.code == 2){
					var sendData = angular.copy($scope.form);
					HttpUtils.post( base + 'updateSave',sendData,function () {
						$scope.site.refresh();
						ModalCtrl.show('提示','修改成功！',modalCode.success);
						$modalInstance.close();
					});
				}
			}
			$scope.close = function () {
				$modalInstance.close();
			}

			$scope.codeTypes = [];
			$scope.roomTypes = [];
			$scope.estateTypes = [];
			$scope.decorTypes = [];
			$scope.rentTypes = [];
			$scope.manageTypes = [];
			initEdit();
			function initEdit(){
				var sendData = {};
				sendData.parentCode = 'RM_CODE_TYPE';
			    HttpUtils.get(dictBase + "list",sendData,function (response) {
					$scope.codeTypes = response.data;
			    });
				sendData.parentCode = 'RM_ROOM_TYPE';
			    HttpUtils.get(dictBase + "list",sendData,function (response) {
					$scope.roomTypes = response.data;
			    });
				sendData.parentCode = 'RM_ESTATE_TYPE';
			    HttpUtils.get(dictBase + "list",sendData,function (response) {
					$scope.estateTypes = response.data;
			    });
				sendData.parentCode = 'RM_RENT_TYPE';
			    HttpUtils.get(dictBase + "list",sendData,function (response) {
					$scope.rentTypes = response.data;
			    });
			}
		}
	
	
})();



