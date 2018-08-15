(function() {
	
	window.open("http://192.168.91.103:8080/nsAdmin/meetingroom/index.html#/manage/home");
    
    //window.location.href = "http://192.168.91.103:8080/nsAdmin/meetingroom/index.html#/manage/home";
    'use strict';

    app.controller('MeetingManageGrid',InitGrid);

    var editCtrl = "MeetingManageGridEdit";
    app.controller(editCtrl,InitEdit);

    var base = '/meeting-room/meetingroom/';
    var editUrl = '../nsAdmin/restaurantbooking/manage/panel_edit.html';


	function InitEdit($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal) {
		
		$scope.form = {};// 清空表单数据
		
		var id = $stateParams.id;
	
		function init(id){
			
			if(id!=null && id!= ''){
				var sendData = {id:id};
			    HttpUtils.get(base + "findById.do",sendData,function (resp) {
				    $scope.entity = resp.data.entity;
			    });
			}
			
		}
		
		function initThings(id){
			
			if(id!=null && id!= ''){
				var sendData = {meetingId:id};
				http://192.168.118.64:7070/meeting-room/meetingtings/listmap.do
			    HttpUtils.get("/meeting-room/meetingtings/listmap.do",sendData,function (resp) {
				    $scope.rows = resp.data.data;
			    });
			}
		}
		
		init(id);
		initThings(id);
		
		$scope.baseFormSubmit = function () {
			
				var id=$("input[name='id']").val();
				
				var sendData = angular.copy($scope.instance);
				var name=$("input[name='name']").val();
				var address=$("input[name='address']").val(); 
				var roomType=$("input[name='roomType']").val(); 
				var useType=$("input[name='useType']").val(); 
				var acreage=$("input[name='acreage']").val(); 
				var layType=$("input[name='layType']").val(); 
				var layTypeNum=$("input[name='layTypeNum']").val(); 
				var openStartTime=$("input[name='openStartTime']").val(); 
				var openEndTime=$("input[name='openEndTime']").val(); 
				var pic=$("input[name='pic']").val(); 
				var description=$("input[name='description']").val(); 
				var tel=$("input[name='tel']").val(); 
				var weChat=$("input[name='weChat']").val(); 
				var isDisplay=$("input[name='isDisplay']").val(); 
				
				sendData = {'name':name,'address':address,'roomType':roomType,'useType':useType,
				'acreage':acreage,'layType':layType,'layTypeNum':layTypeNum,'openStartTime':openStartTime,
				'openEndTime':openEndTime,'pic':pic,'description':description,'tel':tel,'weChat':weChat,
				'isDisplay':isDisplay,'isAuditManage':'1'};
				
			
				if(id!=null && id!= ''){
					// 修改
					sendData = {'id':id,'name':name,'address':address,'roomType':roomType,'useType':useType,
					'acreage':acreage,'layType':layType,'layTypeNum':layTypeNum,'openStartTime':openStartTime,
					'openEndTime':openEndTime,'pic':pic,'description':description,'tel':tel,'weChat':weChat,
					'isDisplay':isDisplay};
				
					//var sendData = angular.copy($scope.entity);
					
					HttpUtils.post(base + 'updateSave.do',sendData,function (data) {
	                	ModalCtrl.show('提示','修改成功',modalCode.success);
	            	});
					
				}else{
				
				sendData = {'name':name,'address':address,'roomType':roomType,'useType':useType,
				'acreage':acreage,'layType':layType,'layTypeNum':layTypeNum,'openStartTime':openStartTime,
				'openEndTime':openEndTime,'pic':pic,'description':description,'tel':tel,'weChat':weChat,
				'isDisplay':isDisplay,'isAuditManage':'1'};
	
	            HttpUtils.post(base + 'addSave.do',sendData,function (data) {
	                ModalCtrl.show('提示','新增成功',modalCode.success);
	            });
					
				}
	        }
		
		$scope.addNewGoods = function () {
			var sendData = {meetingId:id};
			//http://192.168.118.64:7070/meeting-room/meetingtings/findThingsList.do
            HttpUtils.get("/meeting-room/meetingtings/findThingsList.do",sendData,function (resp) {
                var site = {};
                site.thingsList = resp.data.data;
                site.title = '新增';
                site.code = 1;
                site.url =  "../nsAdmin/meetingroom/roommanage/things_add.html",
                site.ctrl = editCtrl
//              site.refresh = function () {
//                  addThings();
//              };
                open(site,$modal);
            });
		}
		
		 $scope.addThings = function () {
		 	
		 	var meetingId = id;
		 	var id_array=new Array();  
			$('input[name="things"]:checked').each(function(){  
			    id_array.push($(this).val());//向数组中添加元素  
			});  
			var idstr=id_array.join(',');//将数组元素连接起来以构建一个字符串  
		 	
		 	var sendData =  {'meetingId':meetingId,'thingsId':idstr,'thingsAmount':'1'};
		 	http://192.168.118.64:7070/meeting-room/meetingtings/addSave.do
            HttpUtils.post('/meeting-room/meetingtings/addSave.do',sendData,function (data) {
                site.refresh();
                ModalCtrl.show('提示','新增成功',modalCode.success);
                $modalInstance.close();
            });
		 }
	}
	
	
    function InitGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){

        var currKeys = undefined;

        $scope.url = base + 'listmap.do';

        $scope.parkId;
        $scope.isRemote = false;

        // 配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1 };
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        // 请求后台数据
        function getGridData(){
            var sendData = {
                searchKeys:currKeys,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData ,function (data) {
                $scope.paginationConf.totalItems =data.data.recordsTotal;
                $scope.rows = data.data.data;
            });
        }

        // 搜索
        $scope.search = function (keys,e) {
            if(e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }


        // 修改
        $scope.update = function (id) {
        	
            var sendData = {id:id};

        	$state.go('app.meeting_manage_edit', {'id':id});
        }
        // 删除
        $scope.deleteById = function(id) {
            ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
                var sendData = {'ids':id};
                HttpUtils.post(base +  'deleteByIds',sendData,function (data) {
                        getGridData();
                        if(data.result == true){
                            ModalCtrl.show('提示','删除成功！',modalCode.success);

                        }else{
                            ModalCtrl.show(data.message, modalCode.error);
                        }
                    }
                );
            });
        };
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

})();



