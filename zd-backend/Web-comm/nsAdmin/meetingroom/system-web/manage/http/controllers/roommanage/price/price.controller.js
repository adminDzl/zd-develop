
import Modal from '../../../utils/modal.util';
 
function priceController($scope,$rootScope,$uibModal,$state,Price,views,$timeout) {

    
    $scope.instance  = new Price();
   
    var commitType='add';
    $scope.dataUrl = baseUrl +'meetingprice/listmap.do';
    $scope.columns = [
        { mData: 'timeLong' },
        { mData: 'priceMoney' } 
    ]
    $scope.isOpen = true;
    $scope.selectedItem = null;
    $scope.del = function(data){
        $scope.selectedItem = data;
        // $scope.instance.del(data);
    }
    
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
    $scope.edit = function(data){
        commitType='edit';
        $scope.instance.priceModel =data;
        openModal();
        
    }
    
    $scope.selectPriceType = function(type){
        $scope.instance.priceModel.priceType = type;
    }
    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addprice);
    }
  
   $scope.addNewPrice = function(){
        $scope.instance.resetData();
        commitType='add';
        openModal() ;  
   
    }
    $scope.commit = function(){
        $scope.instance.saveOrUpdate( $rootScope.modalInstance,commitType); 
    }
    $scope.cancel = function(){
         $rootScope.modalInstance.dismiss('cancel');  
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
 
priceController.$inject = ['$scope','$rootScope','$uibModal','$state','priceService','views','$timeout']
export default angular.module('priceController',[]).controller('priceController',priceController).name;