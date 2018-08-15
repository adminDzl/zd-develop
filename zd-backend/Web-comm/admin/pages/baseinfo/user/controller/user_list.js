(function() {
	 'use strict';
	 
	 app.controller('TUserGrid',Grid);
	 
	 var editCtrl = "TUserEdit";
	 var detailCtrl = "TUserDetail";
	 app.controller(editCtrl,DCtrl);
	 app.controller(detailCtrl,ECtrl);
	 app.controller("UpdatePasswordEdit",UpdatePasswordCtrl);
	 
	 
	 var base = '/baseinfo/user/';
	 var editUrl = '../admin/pages/baseinfo/user/user_edit.html';
	 var modelCode = 'userEntity';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,userCompanyChoose,userParkChoose,userDeptChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"manageList";

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	    	$scope.checkListAll = false;
	 		var sendData = {
	 			searchKeys:currKeys,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		}

	 		HttpUtils.get($scope.url, sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
	 		});
	 		
	 	 }  
	     
	     //新增
	     $scope.addNew = function () {
	    	var sendData = {};
	    	HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
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
	 	 
	 	 //详情
	 	$scope.detail = function(id){
	    	 var sendData = {id:id};
	    	 HttpUtils.get(base + "getUserDetail",sendData,function (data) {
	    		 var site = {};
	    		 site.data= data.data;
	 			 site.title = '用户详情';
	 			 site.url =  "../admin/pages/baseinfo/user/user_detail.html",
	 			 site.ctrl = "TUserDetail",
	 			 open(site,$modal);
	    	 });
	     }
	 	 
	     //修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.data = data;
	 			site.title = '修改';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     //密码
	     $scope.updatePassword = function (row) {
	 			var site = {};
	 			site.data = row;
	 			site.title = '修改密码';
	 			site.code = 1;
	 			site.url =  "../admin/pages/baseinfo/user/user_password.html",
	 			site.ctrl = UpdatePasswordCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			openInitPassword(site,$modal);
	 	 }
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.checkList = [];
	 		$scope.keyword = currKeys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     
	     
	     //删除
	     $scope.deleteById = function(id) {
	    	var msg = '';
	    	if(status1 == 1){
	    		status1 = -1;
	    		msg = '禁用成功';
	    	}else{
	    		status1 = 1;
	    		msg = '开放成功';
	    	}
	    	 
	    	var sendData = {
	    		 'id':id,
	    		 'status1':status1
	    	};
			HttpUtils.post( base + 'updateSave',sendData,function () {
				getGridData();
				ModalCtrl.show('提示',msg,modalCode.success);
			});
	    	 
	 		/*ModalCtrl.show('提示','您确定要禁用吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','禁用成功！',modalCode.success);
	 				}
	 			);
	 		});*/
	 	 }
	     
	     //加入部门
	     $scope.joinDept = function(id){
	    	 var checkedIds = [];
	    	 userDeptChoose.choose(function (data) {},checkedIds,'/baseinfo/relation/getUserDeptSelects',{userId:id});
	     }
	     //加入公司
	     $scope.joinOrg = function(id){
	    	 var checkedIds = [];
	    	 userCompanyChoose.choose(function (data) {
	    		 /*if(data && data.length>0){
				   	    	saveUserOrgs(id,orgId);
			 		 }else{
			            	ModalCtrl.show('提示','请选择公司！',modalCode.warning);
			 		 }*/
	    	 },checkedIds,'/baseinfo/relation/getUserOrgSelects',{userId:id});
	     }
	     //保存用户-公司关系
	     /*function saveUserOrg(userId,orgId){
	    	var sendData = {userId:userId,orgId:orgId};
			HttpUtils.post('/baseinfo/relation/saveUserOrg',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入公司成功',modalCode.success);
			});
	     }*/
	     
	     
	     
	     //加入园区
	     $scope.joinPark = function(id){
	    	 
	    	 var form = {};
	    	 var checkedIds = [];
	    	 userParkChoose.choose(function (data) {
	    		 	/*if(data && data.length>0){
			   	    	saveUserParks(id,data);
		 			}else{
		            	ModalCtrl.show('提示','请选择园区！',modalCode.warning);
		 			}*/
	            },checkedIds,'/baseinfo/relation/getUserParkSelects',{userId:id}
	         );
	     }
	     //全选
	     $scope.checkList = [];
	     $scope.checkAll = function(){
	    	 if($scope.checkListAll) {
	             $scope.checkList = [];
	             angular.forEach($scope.rows, function (i) {
	                 i.checked = true;
	                 $scope.checkList.push(i.id);
	             })
	         }else {
	             angular.forEach($scope.rows, function (i) {
	                 i.checked = false;
	                 $scope.checkList = [];
	             })
	         }
	    	 console.log($scope.checkList);
	     }
	     //单选
	     $scope.checkOne = function () {
	         angular.forEach($scope.rows , function (i) {
	             var index = $scope.checkList.indexOf(i.id);
	             if(i.checked && index === -1) {
	                 $scope.checkList.push(i.id);
	             } else if (!i.checked && index !== -1){
	                 $scope.checkList.splice(index, 1);
	             };
	         })

	         if ($scope.rows.length === $scope.checkList.length) {
	             $scope.checkListAll = true;
	         } else {
	             $scope.checkListAll = false;
	         }
	         console.log($scope.checkList);
	     }
	     
	     //批量加入部门
	     $scope.batchDept = function(){
	    	 if($scope.checkList.length <= 0){
	    		 ModalCtrl.show('提示','请选择用户！',modalCode.warning);
	    		 return;
	    	 }
	    	 var checkList = $scope.checkList;
	    	 var checkedIds = checkList.join(",");
	    	 userDeptChoose.chooses(function (checkList) {
		    		var sendData = {userIds:checkedIds,deptId:checkList.join(",")};
		 			HttpUtils.post('/baseinfo/relation/saveUsersDept',sendData,function (data) {
		 				getGridData();
		 				$scope.checkListAll = false;
		 				ModalCtrl.show('提示','批量加入部门成功',modalCode.success);
		 			});
	            },checkedIds,'/baseinfo/basDept/grid');
	     }
	   //批量加入公司
	     $scope.batchOrg = function(){
	    	 if($scope.checkList.length <= 0){
	    		 ModalCtrl.show('提示','请选择用户！',modalCode.warning);
	    		 return;
	    	 }
	    	 var checkList = $scope.checkList;
	    	 var checkedIds = checkList.join(",");
	    	 userDeptChoose.chooses(function (checkList) {
		    		var sendData = {userIds:checkedIds,orgId:checkList.join(",")};
		 			HttpUtils.post('/baseinfo/relation/saveUsersOrg',sendData,function (data) {
		 				getGridData();
		 				$scope.checkListAll = false;
		 				ModalCtrl.show('提示','批量加入公司成功',modalCode.success);
		 			});
	            },checkedIds,'/baseinfo/organization/list?orgType=1');
	     }
	   //批量加入园区
	     $scope.batchPark = function(){
	    	 if($scope.checkList.length <= 0){
	    		 ModalCtrl.show('提示','请选择用户！',modalCode.warning);
	    		 return;
	    	 }
	    	 var checkList = $scope.checkList;
	    	 var checkedIds = checkList.join(",");
	    	 userDeptChoose.chooses(function (checkList) {
		    		var sendData = {userIds:checkedIds,parkId:checkList.join(",")};
		 			HttpUtils.post('/baseinfo/relation/saveUsersPark',sendData,function (data) {
		 				getGridData();
		 				$scope.checkListAll = false;
		 				ModalCtrl.show('提示','批量加入园区成功',modalCode.success);
		 			});
	            },checkedIds,'/baseinfo/park/list');
	     }
	     
	     
	     //下载模板
	     $scope.toDataDownload = function(){
	    	 location.href= "/baseinfo/open/excelhead/excelTempExport?modelCode="+modelCode;
	     };
	     
	     
	     
	   //导入数据
	     $scope.toDataImport = function(){
	         $('#dataImport').modal(); 
	         var fileInput = document.getElementById("fileInput");
	     	// for IE, Opera, Safari, Chrome
	          if (fileInput.outerHTML) {
	              fileInput.outerHTML = fileInput.outerHTML;
	          } else { // FF(包括3.5)
	              fileInput.value = "";
	          }
	     };
	     
	 	$scope.dataImport=function(){
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
		        url:base + "dataImport",
		        data: fd,
		        headers:{Authorization:localStorage.token,'Content-Type':undefined},
		        transformRequest: angular.identity 
	        }).success( function ( data ){
	        	 //上传成功的操作
			    if(data.result){
			    	$('#dataImport').modal("hide"); 
		    		 getGridData();
		    		 ModalCtrl.show('提示','导入数据成功',modalCode.success);
			    }else{
			    	ModalCtrl.show('提示','导入数据失败',modalCode.error);
			    }
	        })
		}
	     
	     
	     //保存用户-园区关系
	     /*function saveUserPark(userId,parkId){
	    	var sendData = {userId:userId,parkId:parkId};
			HttpUtils.post('/baseinfo/relation/saveUserPark',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入园区成功',modalCode.success);
			});
	     }
	     function saveUserParks(userId,parkId){
		    	var sendData = {userId:userId,parkId:parkId};
				HttpUtils.post('/baseinfo/relation/saveUserPark',sendData,function (data) {
					getGridData();
					ModalCtrl.show('提示','加入园区成功',modalCode.success);
				});
		 }*/
	     
	    
	 }
     //打开页面
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
     function openInitPassword(site,$modal) {
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

    
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data;
		}
		
		mm.joinDisabled = false;
		mm.addDisabled = true;
		
		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
				});
			}
			$modalInstance.close();
		}
		mm.close = function () {
			$modalInstance.close();
		}
	}
	

	function ECtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = site.data.userDetailMap;
		var parkNames="";
		var orgNames="";
		var deptNames="";
		if(mm.form.parkList.length>0){
			for(var i = 0;i<mm.form.parkList.length;i++){ 
				if(i==mm.form.parkList.length-1){
					parkNames=parkNames+mm.form.parkList[i].parkName;
				}else{
					parkNames=parkNames+mm.form.parkList[i].parkName+',';
				}
			 }
		}
		if(mm.form.orgList.length>0){
			for(var i = 0;i<mm.form.orgList.length;i++){ 
				if(i==mm.form.orgList.length-1){
					orgNames=orgNames+mm.form.orgList[i].orgName;
				}else{
					orgNames=orgNames+mm.form.orgList[i].orgName+',';
				}
			 }
		}
		if(mm.form.deptList.length>0){
			for(var i = 0;i<mm.form.deptList.length;i++){ 
				if(i==mm.form.deptList.length-1){
					deptNames=deptNames+mm.form.deptList[i].deptName;
				}else{
					deptNames=deptNames+mm.form.deptList[i].deptName+',';
				}
			}
		}
		mm.form.parks=parkNames;
		mm.form.orgs=orgNames;
		mm.form.depts=deptNames;
		
		mm.close = function () {
			$modalInstance.close();
		}
	}
	
	function UpdatePasswordCtrl($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		
		var userId = mm.site.data.id;
		
		mm.updateUserPassword = function () {
			var password=$scope.password;
			if(password == "" || password == null || password == undefined){
				password=null;
		    }else{
		    	if(password.length<6){
					ModalCtrl.show('提示','请输入最少六位密码！',modalCode.danger);
					$modalInstance.close();
					return;
				}
		    }
			
			
			var sendData = {"userId":userId,"password":password};
			HttpUtils.post( base + 'updatePassword',sendData,function () {
				mm.site.refresh();
				ModalCtrl.show('提示','修改成功！',modalCode.success);
				$modalInstance.close();
			});
		}
		mm.close = function () {
			$modalInstance.close();
		}
	}
	
	
})();



