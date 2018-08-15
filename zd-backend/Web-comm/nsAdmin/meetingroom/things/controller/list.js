(function() {
    'use strict';

    app.controller('ThingsManageGrid',InitGrid);
    var base = '/meeting-room/things/';
    
    var editCtrl = "ThingsManageEdit";
    app.controller(editCtrl,InitEdit);
    var editUrl = '../nsAdmin/meetingroom/things/add_things.html';
	
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
        
        // 新增
        $scope.addNew = function () {
            var sendData = {};
//          HttpUtils.get(base + "initEdit",sendData,function (resp) {
                var site = {};
//              site.data = resp.data;
//              site.parkId = $scope.parkId;
                site.title = '新增';
                site.code = 1;
                site.url =  editUrl,
                    site.ctrl = editCtrl,
                    site.refresh = function () {
                        getGridData();
                    };
                open(site,$modal);
//          });
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
    
    
    
    function InitEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance,$modal) {
        $scope.form = {};// 清空表单数据
        //$scope.site为外部引用参数对象 1为新增 2为修改
        $scope.site = site;

        if(site.code == 1){

        }
        if(site.code == 2){
            $scope.form = angular.copy(site.data);
        };

        $scope.addSave = function () {
        	
        	var name=$("input[name='name']").val();
			var params=$("input[name='params']").val(); 
			var amount=$("input[name='amount']").val(); 
			var freeType=$("input[name='freeType']").val(); 
			var price=$("input[name='price']").val(); 
			var unit=$("input[name='unit']").val(); 
        	
        	if(price==null){
        		price = 0;
        	}
        	
        	var sendData = angular.copy($scope.form);
        	sendData = {'name':name,'params':params,'amount':amount,'freeType':freeType,
				'price':price,'unit':unit};
        	
        	HttpUtils.post(base + 'addSave.do',sendData,function (data) {
                    site.refresh();
                    ModalCtrl.show('提示','新增成功',modalCode.success);
                    $modalInstance.close();
                });
                
        }
        // 获取用户信息
        $scope.getUserInfo = function () {
            //配置分页，监听分页
            var currKeys = undefined;
	        var paginationConf = {pageSize: 10, currentPage: 1 };
            var sendData = {
                searchKeys:currKeys,
                pageNo: paginationConf.currentPage,
                pageSize: paginationConf.pageSize
            }
            var sitess = {
                url: "../nsAdmin/officialcars/driver/users_choose_dialog.html",
                ctrl: "UsersDialogCtrl",
                parkId: $scope.site.parkId,
                single: true,
                callback: function(name){
                    console.log(name);
                    $scope.form.userId = name.id;
                    $scope.form.driverName = name.realname;
                    $scope.form.driverPhone = name.mobile;
                }
            };
            HttpUtils.get('/baseinfo/user/list', sendData ,function (data) {
                open(sitess,$modal)
            });
        }
        $scope.close = function () {
            $modalInstance.close();
        }


    }

})();



