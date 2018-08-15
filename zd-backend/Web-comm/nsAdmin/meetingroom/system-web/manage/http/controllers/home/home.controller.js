import Cache from "../../utils/cache.util";
import Tools from '../../utils/tools.util';
 
// var jQuery = require('jquery');
// require('ui/ui-load');
// require('ui/ui-jp.config.js');
// require('ui/ui-jp.js');
// require('ui/ui-nav.js');
// require('ui/ui-toggle.js');
// require('ui/ui-client.js');

function homeController($scope,$rootScope,$uibModal,Home,$state) {
    $scope.instance = new Home();
    $scope.dataUrl = baseUrl+'meetingroom/listmap.do'
    $scope.columns = [{mData:'id'},{mData:'name'},{mData:'roomTypeName'},{mData:'address'},{mData:'useTypeList'},{mData:'acreage'},{mData:'layTypeNum'},{mData:'isDisplay'}];
    $scope.selectedItem = null;
    $scope.toAddNewPlace = function(){
        
        Cache.del('edit_meetingroom_info');
        Cache.del('price_manage_status');
        Cache.del('perferential_manage_status');
        Cache.del('time_manage_status');
        Cache.del('mid')
        $state.go('manage.meetingroom.addroom')
    }
  
    $scope.del = function(data){
        $scope.selectedItem = data;
    }
    $scope.edit = function(data){
        Cache.put('edit_meetingroom_info',data)       
        Cache.put('mid',data.id);      
        Tools.priceManageStatus(data.isPriceManage) 
        Tools.timeManage(data.isTimeManage);
        Tools.perferentialManage(data.isPerferentialManage);
        $state.go('manage.meetingroom.addroom')
    }
    $scope.view = function(data){
        Cache.put('edit_meetingroom_info',data)
    }
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem);
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}

 
homeController.$inject = ['$scope','$rootScope','$uibModal','homeService','$state']
export default angular.module('homeController',[]).controller('homeController',homeController).name;