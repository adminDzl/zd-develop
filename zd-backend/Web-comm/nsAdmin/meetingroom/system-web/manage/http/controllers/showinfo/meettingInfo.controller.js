
import Modal from '../../utils/modal.util';
import Tools from '../../utils/tools.util'
function meettingInfoController($scope,$rootScope,$uibModal,views,ShowInfo,$state){
    
    var weekday = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];//getDay
    var date = new Date();
    $scope.date = Tools.dateFormat(date,'yyyy-MM-dd');
    $scope.time = Tools.dateFormat(date,'hh:mm')
    $scope.week = weekday[date.getDay()]
}
 

meettingInfoController.$inject = ['$scope','$rootScope','$uibModal','views','showInfoService','$state']
export default angular.module('meettingInfoController',[]).controller('meettingInfoController',meettingInfoController).name;