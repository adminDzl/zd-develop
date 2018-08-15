

function bespeakController($scope,$rootScope,$uibModal,$state,Bespeak,views){
    
     $scope.instance = new Bespeak();
     $scope.selectType = function(type){
         $scope.instance.model.isFirstOpen = type;
     }
     $scope.selectType1 = function(type){
        $scope.instance.model.firstPayType = type;
    }
    $scope.selectType2 = function(type){
      
        $scope.instance.model.lastPayType = type;
    }
    $scope.commit = function(){
        $scope.instance.saveOrUpdate();
    }
     $scope.$on('$destroy',function(){
         $scope.instance = null;
     })
}
 

bespeakController.$inject = ['$scope','$rootScope','$uibModal','$state','bespeakService','views']
export default angular.module('bespeakController',[]).controller('bespeakController',bespeakController).name;