function staffDetailController($rootScope,$scope,StaffService,$state,$stateParams){
    $scope.instance =new StaffService();
    $scope.id = $stateParams.id;
    $scope.instance.loadDetailById($scope.id);
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
staffDetailController.$inject =['$rootScope','$scope','staffService','$state','$stateParams'];
export default angular.module('staffDetailController',[]).controller('staffDetailController',staffDetailController).name;