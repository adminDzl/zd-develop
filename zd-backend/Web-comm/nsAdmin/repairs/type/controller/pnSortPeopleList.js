/**
 * 人员列表
 */
(function(){
	'use strict'
	var editUrl = '../nsAdmin/repairs/type/';
	app.controller('SortPeopleListCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$stateParams,$compile){
		
		//配置分页基本参数
	    $scope.paginationConf = {
	    	pageSize: 10,
	        currentPage: 1
	    };
		$scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
			getPeopleList();
		});
		
		var checkedList = [];
		$scope.search = function(){
	        $scope.paginationConf.currentPage == 1? getPeopleList():$scope.paginationConf.currentPage = 1;
		}	    
		
		function getPeopleList() {
			var postData = {
				sortChiefId: $stateParams.chiefId,
				pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
			}
			console.log(postData);
			if(!$stateParams.chiefId){
				return;
			}

		    HttpUtils.get("/pnc/pncsortprocessuser/list",postData,function (initData) {
				console.log(initData);
		    	if(initData.errorMsg){
		    		return;
		    	}
		    	$scope.paginationConf.totalItems =initData.data.page.total;
		    	$scope.peopleList = initData.data.peopleList;
		    	$scope.peopleTree = initData.data.page.rows;
		    	
		    	checkedList = [];
		    })		
		}
		
		function getNewStr(str,subLen) {  
			  var len = 0;
			  var newStr = "";
			  for (var i=0; i<str.length; i++) {  
			    if (str.charCodeAt(i)>127 || str.charCodeAt(i) == 94) {  
			       len += 2;  
			    } else {  
			       len ++;  
			    }
			    if(len < subLen){
			    	newStr += str[i];
			    }
			    else{
			    	newStr += "...";
			    	break;
			    }
			   }  
			  return newStr;  
		}			
		
		$scope.clicksBranch = function(p_id){
			var self = angular.element("tr[id='"+p_id+"']>td:nth-child(2)");
			var i_class = self.children().find('i').attr("class");
			var childClass = angular.element("tr[id^='"+p_id+"_']");
			if(!childClass || childClass.length == 0){
				return;
			}
			if(i_class.indexOf("fa-minus-square-o")>-1){
				childClass.hide();
				self.children().find('i').removeClass("fa-minus-square-o");
				self.children().find('i').addClass("fa-plus-square-o");
			}
			else{
				childClass.show();
				self.children().find('i').removeClass("fa-plus-square-o");
				self.children().find('i').addClass("fa-minus-square-o");				
			}
		}
		$scope.clickBox = function(id){
			if(id.chk && checkedList.indexOf(id)==-1){
				checkedList.push(id);
			}else if(!id.chk){
				var list = checkedList;
				angular.forEach(list,function(obj,i){
					if(obj.id == id.id){
						checkedList.splice(checkedList.indexOf(obj),1);
					}
				});
			}
			console.log(checkedList);
		}
		
		$scope.set = function(){
			if(!checkedList || checkedList.length == 0){
				ModalCtrl.show('提示','请选择人员!',modalCode.default);
				return;
			}
			openBatch();
		}
		
	    function openBatch() {
	    	var site = {
	    		sortChiefId : $stateParams.chiefId,
	    		refresh	: function () {
		    		getPeopleList();
				}
	    	};
			site.users = checkedList;
			site.usersStr = "";
				angular.forEach(checkedList,function(pId,p){
						site.usersStr += pId.userId+";";
				})
	    	
	        $modal.open({
	            templateUrl: editUrl+'pn_sort_people_edit_batch.html',
	            controller: 'PnSortPeopleEditBatchCtrl',
	            controllerAs: 'batchCtrl',
	            size:'lg',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        })
	    }		
	    
	    $scope.update = function(id){
			var site = {};	    	
			site.sortChiefId = $stateParams.chiefId;
			site.row = id
			open(site);
		}
		$scope.remove = function(id,sortSubId){
			var site = {};
			site.sortChiefId = $stateParams.chiefId;
			var postData = {
				sortId: sortSubId,
				userId: id.userId,
				sortChiefId: $stateParams.chiefId
			};	
		    HttpUtils.post('/pnc/pncsortprocessuser/removeUser',postData,function (responseResult) {
				ModalCtrl.show('提示','删除成功',modalCode.success);
				getPeopleList();
		    })
		}
		// 新增
        $scope.addNew = function () {
                var site = {};
                site.parkId = $scope.parkId;
                site.title = '新增人员列表';
				site.type ='add'
                open(site,$modal);
        };

	    function open(site) {
	    	site.refresh = function () {
	    		getPeopleList();
			};
			var templateUrl = site.type =='add' ? editUrl+'pn_sort_people_add_new.html' : editUrl+'pn_sort_people_edit.html';
			var controller = site.type =='add' ? 'pnSortAddCtrl' : 'PnSortPeopleEditCtrl';
			var controllerAs = site.type =='add' ? 'addCtrl' : 'peopleCtrl';
	        $modal.open({
	            templateUrl: templateUrl,
	            controller: controller,
	            controllerAs: controllerAs,
	            size:'lg',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        })
	    }		
	});
	app.controller('pnSortAddCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance,$stateParams,$modal) {
		var addCtrl = this;
		addCtrl.site = site;
		addCtrl.close = function () {
			$modalInstance.close();
		}
		if(!$stateParams.chiefId){
			return;
		}
		addCtrl.addSave = function () {
			if (!addCtrl.name||addCtrl.name == null) {
				ModalCtrl.show('提示','姓名为必填!');
				return;
			}
			var postData = {
				name: addCtrl.name,
				sortChiefId: $stateParams.chiefId,
				userId: addCtrl.userId
			};	
		    HttpUtils.post('/pnc/pncsortprocessuser/addSave',postData,function (responseResult) {
				ModalCtrl.show('提示','新增成功',modalCode.success);
				addCtrl.site.refresh();					
				$modalInstance.close();
		    })	
		}
		// 获取用户信息
        addCtrl.getUserInfo = function () {
            //配置分页，监听分页
            var currKeys = undefined;
	        var paginationConf = {pageSize: 10, currentPage: 1 };
            var sendData = {
                searchKeys:currKeys,
                pageNo: paginationConf.currentPage,
                pageSize: paginationConf.pageSize
            }
            var sitess = {
                url: "../nsAdmin/repairs/type/user_choose.html",
                ctrl: "UserCtrl",
                parkId: addCtrl.site.parkId,
                single: true,
                callback: function(name){
					addCtrl.userId = name.id;
					addCtrl.name = name.realname;
                }
            };
            HttpUtils.get('/baseinfo/user/list', sendData ,function (data) {
                opens(sitess,$modal)
            });
		}
		function opens(site,$modal) {
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
			
	});
	
	app.controller('PnSortPeopleEditCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var peopleCtrl = this;
		peopleCtrl.site = site;
		if(!peopleCtrl.site.sortPeople){
			peopleCtrl.site.sortPeople = {};
		}
		peopleCtrl.editSort = angular.copy(peopleCtrl.site.row);
		
		function initPage(){
			var postData = {
					sortChiefId:peopleCtrl.site.sortChiefId,
					userId:peopleCtrl.site.row.userId
			};
		    HttpUtils.get("/pnc/userauth/getPower",postData,function (initData) {
		    	peopleCtrl.subList = initData.data.sortSubs;
		    	peopleCtrl.areaList = initData.data.areas;
				peopleCtrl.editSort = initData.data.users;
				peopleCtrl.userAuths = initData.data.userAuths;
		    	var areaIds = peopleCtrl.userAuths.areaIds;
		    	if(areaIds){
		    		peopleCtrl.editSort.area ={};
		    		angular.forEach(peopleCtrl.areaList,function(obj,i){
		    			if(areaIds.indexOf(obj.id)>-1){
		    				peopleCtrl.editSort.area[''+i+''] = obj.id; 
		    			}
		    		})
		    	}
		    	
		    	var sortSubIds = peopleCtrl.userAuths.powerSubIds;
		    	if(sortSubIds){
		    		peopleCtrl.editSort.sortSub ={};
		    		angular.forEach(peopleCtrl.subList,function(obj,i){
		    			if(sortSubIds.indexOf(obj.id)>-1){
		    				peopleCtrl.editSort.sortSub[''+i+''] = obj.id; 
		    			}
		    		})
		    	}	
		    	
		    	var powerIds = peopleCtrl.userAuths.powerId+"";
		    	if(powerIds){
		    		peopleCtrl.editSort.powerSub ={};
		    		if(powerIds.indexOf("1")>-1){
		    			peopleCtrl.editSort.powerSub['0'] = 1; 
		    		}
		    		if(powerIds.indexOf("2")>-1){
		    			peopleCtrl.editSort.powerSub['1'] = 2; 
		    		}
		    	}			    	
		    	
		    })	
		}
		initPage();

		peopleCtrl.close = function () {
			$modalInstance.close();
		}

		peopleCtrl.addSave = function () {
			peopleCtrl.editSort.sortChiefId = peopleCtrl.site.sortChiefId;
			var count = 0;
			var powerId = "";
			var powerSubIds = [];
			var areaIds = [];
			//权限
			var powerSub = peopleCtrl.editSort.powerSub;
			if(powerSub){
				angular.forEach(powerSub,function(power,property){
					if(power){
						peopleCtrl.editSort['powerList['+count+'].powerId'] = 1;
						peopleCtrl.editSort['powerList['+count+'].powerSubId'] = power;
						count++;
						powerId += power;
					}
				});
			}
			
			//二级分类
			var sortSub = peopleCtrl.editSort.sortSub;
			if(sortSub){
				angular.forEach(sortSub,function(sub,property){
					if(sub){
						peopleCtrl.editSort['powerList['+count+'].powerId'] = 2;
						peopleCtrl.editSort['powerList['+count+'].powerSubId'] = sub;
						count++;
						powerSubIds.push(sub);						
					}
				});				
			}else{
				ModalCtrl.show('提示','请选择下级分类!',modalCode.warning);
				return;				
			}
			
			//区域
			var areaList = peopleCtrl.editSort.area;
			if(areaList){
				angular.forEach(areaList,function(area,property){
					if(area){
						peopleCtrl.editSort['powerList['+count+'].powerId'] = 3;
						peopleCtrl.editSort['powerList['+count+'].powerSubId'] = area;
						count++;
						areaIds.push(area);	
					}
				});				
			}	
			
			var url = '/pnc/userauth/addPower';
			if(peopleCtrl.userAuths.areaIds ||peopleCtrl.userAuths.powerId ||peopleCtrl.userAuths.powerSubIds){
				url = '/pnc/userauth/updatePower';
			}
			var data = {
				jsonStr: JSON.stringify({
				   powerId: powerId,
				   powerSubIds: powerSubIds,
				   areaIds: areaIds,
				   userIds: peopleCtrl.site.row.userId,
				   sortChiefId: peopleCtrl.site.sortChiefId
				})
		   };
			HttpUtils.post(url,data,function () {
				ModalCtrl.show('提示',"保存成功！",modalCode.success);
				peopleCtrl.site.refresh();					
				$modalInstance.close();
			})			
			
		};
	});
	
	app.controller('PnSortPeopleEditBatchCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var batchCtrl = this;
		
		batchCtrl.editSort = {
			sortChiefId:site.sortChiefId
		};
		
		function initPage(){
			var postData = {
					sortChiefId:site.sortChiefId,
					userIds: site.usersStr
			};
		    HttpUtils.get("/pnc/userauth/addInit",postData,function (initData) {
		    	batchCtrl.subList = initData.data.sortSubs;
				batchCtrl.areaList = initData.data.areas;
				batchCtrl.users = initData.data.users;
		    })	
		}
		initPage();

		batchCtrl.close = function () {
			$modalInstance.close();
		}

		batchCtrl.addSave = function () {
			batchCtrl.editSort.sortChiefId = site.sortChiefId;
			var validateCount = 0;
			var count = 0;
			var powerId = "";
			var powerSubIds = [];
			var areaIds = [];
			//权限
			var powerSub = batchCtrl.editSort.powerSub;
			if(powerSub){
				validateCount++;
				angular.forEach(powerSub,function(power,property){
					if(power){
						batchCtrl.editSort['powerList['+count+'].powerId'] = 1;
						batchCtrl.editSort['powerList['+count+'].powerSubId'] = power;
						count++;
						powerId += power
					}
				});
				console.log(powerId)
			}
			else{
				ModalCtrl.show('提示','请选择权限!',modalCode.warning);
				return;				
			}			
			
			//二级分类
			var sortSub = batchCtrl.editSort.sortSub;
			if(sortSub){
				validateCount++;
				angular.forEach(sortSub,function(sub,property){
					if(sub){
						batchCtrl.editSort['powerList['+count+'].powerId'] = 2;
						batchCtrl.editSort['powerList['+count+'].powerSubId'] = sub;
						count++;
						powerSubIds.push(sub)						
					}
				});				
			}
			else{
				ModalCtrl.show('提示','请选择下级分类!',modalCode.warning);
				return;				
			}			
			
			//区域
			var areaList = batchCtrl.editSort.area;
			if(areaList){
				validateCount++;
				angular.forEach(areaList,function(area,property){
					if(area){
						batchCtrl.editSort['powerList['+count+'].powerId'] = 3;
						batchCtrl.editSort['powerList['+count+'].powerSubId'] = area;
						count++;
						areaIds.push(area);	
					}
				});				
			}
			else{
				ModalCtrl.show('提示','请选择负责区域!',modalCode.warning);
				return;				
			}
			
			batchCtrl.editSort.batchUsers = site.usersStr;
			console.log(batchCtrl.editSort);
			var url = '/pnc/userauth/addPower';
			var data = {
				 jsonStr: JSON.stringify({
					powerId: powerId,
					powerSubIds: powerSubIds,
					areaIds: areaIds,
					userIds: batchCtrl.editSort.batchUsers,
					sortChiefId: batchCtrl.editSort.sortChiefId
				 })
			};
			HttpUtils.post(url,data,function () {
				ModalCtrl.show('提示',"保存成功！",modalCode.success);
				site.refresh();					
				$modalInstance.close();
			});		
			
		}
	});	
	
})()