 

function infomationController($scope,$rootScope,$uibModal,views,Infomation){
    $scope.instance = new Infomation();
 
    $scope.commit = function(){
        $scope.instance.update();
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
 
 
infomationController.$inject = ['$scope','$rootScope','$uibModal','views','infomationService']
export default angular.module('infomationController',[]).controller('infomationController',infomationController).name;