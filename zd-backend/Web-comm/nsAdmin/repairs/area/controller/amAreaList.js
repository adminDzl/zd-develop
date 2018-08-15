/**
 * 区域管理
 */
(function(){
	'use strict'
	var editUrl = '../nsAdmin/repairs/area/am_area_edit.html';
	app.controller('AreaListCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$element){
		//配置分页基本参数
	    $scope.paginationConf = {
	    	pageSize: 10,
	        currentPage: 1
	    };
	    $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
			getAreaList();
		});
	    
	    $scope.viewById = function(index) {
			var site = {
					title:'区域查看',
					code: 3
				}	    	
			var area = $scope.areaList[index];
			if(!area){
				return;
			}
			site.area = area;
			open(site);	    	
		}
	    
	    $scope.update = function(index){
			var site = {
					title:'编辑区域',
					code: 2
				}	    	
			var area = $scope.areaList[index];
			if(area){
				site.area = area;
			}
			open(site);
	    }

		$scope.addNew = function() {
			var site = {
					title:'新增区域',
					code: 1
				}
			open(site);
		}
		
	    function open(site) {
	    	site.refresh = function () {
				getAreaList();
			};
	    	
	        $modal.open({
	            templateUrl: editUrl,
	            controller: 'AmAreaEditCtrl',
	            controllerAs: 'areaCtrl',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        })
	    }		

		$scope.search = function(){
//			if (ev && ev.keyCode !== 13) return;
			$element.find("button[ng-model='keys']").removeClass("btn-status-bgc");
			var index = $scope.keys?$scope.keys:0;
			$element.find("#status"+index).addClass("btn-status-bgc");
			
	        $scope.paginationConf.currentPage == 1? getAreaList():$scope.paginationConf.currentPage = 1;
		}	    
	    
		function getAreaList() {
			var keys = $scope.keys;
			var postData = {
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize,
				searchKeys:keys ? keys :''
			}
			console.log($scope.paginationConf.currentPage);

			HttpUtils.post('/pnc/area/list',postData,function (datas) {
				console.log(datas);
				$scope.paginationConf.totalItems =datas.data.page.total;
				$scope.areaList = datas.data.page.rows;
			})
		}
	})
	
	app.controller('AmAreaEditCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var areaCtrl = this;
		areaCtrl.site = site;
		
		if(!areaCtrl.site.area){
			areaCtrl.site.area = {
					recordStatus:'1'
			};
		}
		
		areaCtrl.area = angular.copy(areaCtrl.site.area);

		areaCtrl.close = function () {
			$modalInstance.close();
		}

		areaCtrl.addSave = function () {
			if(!areaCtrl.area.name){
				ModalCtrl.show('提示','区域名称不能为空!',modalCode.warning);
				return;
			}
			if (areaCtrl.site.area.name == areaCtrl.area.name){
				store();
			}else {
				HttpUtils.post('/pnc/area/validateName',{id:areaCtrl.area.id,name:areaCtrl.area.name},function (responseResult) {
					if(responseResult.data.validate){
						ModalCtrl.show('提示','区域名称重复!',modalCode.warning);
					}
					else{
						store();
					}
				})
			}
			
		}
		
		function store(){
			if(!areaCtrl.area.recordStatus){
				ModalCtrl.show('提示','请选择区域状态!',modalCode.warning);
				return;
			}			
			
			var storeData = angular.copy(areaCtrl.area);
			console.log(storeData);
			var postUrl = '/pnc/area/addSave';
			var tip = "新增成功!";
			if(areaCtrl.site.code == 2){
				postUrl = "/pnc/area/updateSave";
				tip = "修改成功!";
			}
			HttpUtils.post(postUrl,storeData,function () {
				ModalCtrl.show('提示',tip,modalCode.success);
				areaCtrl.site.refresh();					
				$modalInstance.close();
			})			
		}
	});
	
})()