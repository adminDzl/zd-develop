/**
 * 报事二级类型
 */
(function(){
	'use strict'
	var editUrl = '../nsAdmin/repairs/type/';
	app.controller('SortSubListCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$stateParams){
		$scope.search = function(ev){
			if (ev && ev.keyCode !== 13) return;
			
	        getSortSubList();
		}	    
	    
		function getSortSubList() {
			console.log($stateParams.chiefId);
			if(!$stateParams.chiefId){
				return;
			}
			
			var keys = $scope.keys;
			var postData = {
				pageNo: 1,
				pageSize: 100,
				sortChiefId: $stateParams.chiefId,
				searchKeys:keys ? keys+"".split(' ').join('+'):''
			}
			HttpUtils.post('/pnc/sortsub/list',postData,function (datas) {
				console.log('问题类型列表',datas);
				$scope.subList = datas.data.page.rows;
			})
		}
		getSortSubList();
	    
	    $scope.viewById = function(index) {
			var site = {
					title:'问题类型查看',
					code: 3
				}	    	
			var area = $scope.subList[index];
			if(!area){
				return;
			}
			site.sortSub = area;
			open(site);	    	
		}
	    
	    $scope.update = function(index){
			var site = {
					title:'编辑问题类型',
					code: 2
				}	    	
			var sub = $scope.subList[index];
			console.log(sub);
			if(sub){
				site.sortSub = sub;
			}
			open(site);
	    }
	    $scope.changeStatus = function(index,type){
	    	var data = $scope.subList[index];
			HttpUtils.post('/pnc/sortsub/updateSave',{id:data.id,recordStatus:type},function (datas) {
				getSortSubList();
			})
	    }
		$scope.addNew = function() {
			var site = {
					title:'新增问题类型',
					code: 1
				}
			open(site);
		}
		
	    function open(site) {
	    	site.refresh = function () {
	    		getSortSubList();
			};
			site.chiefId = $stateParams.chiefId;
	    	
	        $modal.open({
	            templateUrl: editUrl+'pn_sort_sub_edit.html',
	            controller: 'PnSortSubEditCtrl',
	            controllerAs: 'subCtrl',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        })
	    }		
	})
	
	app.controller('PnSortSubEditCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance,$stateParams) {
		var subCtrl = this;
		subCtrl.site = site;
		
		if(!subCtrl.site.sortSub){
			subCtrl.editSortSub = {};
		}
		else{
			subCtrl.editSortSub = angular.copy(subCtrl.site.sortSub);
		}
		
		subCtrl.close = function () {
			$modalInstance.close();
		}
		
		subCtrl.addSave = function () {
			var postData;
			if(!subCtrl.site.sortSub || subCtrl.site.sortSub==null) {
				postData ={
						sortChiefId:$stateParams.chiefId,
						name:subCtrl.editSortSub.name
					}
			}else {
				 postData ={
						id:subCtrl.site.sortSub.id,
						sortChiefId:$stateParams.chiefId,
						name:subCtrl.editSortSub.name
					}
			}
			if(!subCtrl.site.sortSub || subCtrl.site.sortSub==null) {
				HttpUtils.post('/pnc/sortsub/validateName',postData,function (responseResult) {
					if(responseResult.data.validate){
						ModalCtrl.show('提示','问题类型名称重复!',modalCode.warning);
					}
					else{
						store();
					}
				})
			}else {
				if (subCtrl.editSortSub.name == subCtrl.site.sortSub.name){
					store();
				}else {
					HttpUtils.post('/pnc/sortsub/validateName',{id:subCtrl.site.sortSub.id,sortChiefId:$stateParams.chiefId,name:subCtrl.editSortSub.name},function (responseResult) {
						if(responseResult.data.validate){
							ModalCtrl.show('提示','问题类型名称重复!',modalCode.warning);
						}
						else{
							store();
						}
					})
				}
		    	
		  }
			
		}
		
		function store(){
			var storeData = subCtrl.editSortSub;
			storeData.index = subCtrl.site.index;
			storeData.recordStatus = 1;
			storeData.recordStatusName = "启用";
			storeData.sortChiefId = subCtrl.site.chiefId;
			delete storeData.index;
			console.log(storeData);
			
			var tip = "新增成功!";
			var postUrl = '/pnc/sortsub/addSave';;
			if(subCtrl.site.code == 2){
				storeData.id = subCtrl.site.sortSub.id;
				delete storeData.sortChiefId;
				tip = "修改成功!";
				postUrl = "/pnc/sortsub/updateSave";
			}
			
			HttpUtils.post(postUrl,storeData,function () {
				ModalCtrl.show('提示',tip,modalCode.success);
				subCtrl.site.refresh();					
				$modalInstance.close();
			})			
		}
	});
	
})()