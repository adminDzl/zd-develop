 
 
import Modal from '../../utils/modal.util';

function thingsController($scope,$rootScope,$uibModal,views,Things){
    
    $scope.instance = new Things();
    var commitType='add';
    $scope.columns = [
        { mData: 'name' },      
        { mData: 'params' },
        { mData: 'amount' },
        { mData: 'freeType' },
        { mData: 'price' },
        { mData: 'unit' } 
    ]
    $scope.dataUrl = baseUrl+'things/listmap.do';
    $scope.selectedItem = null;
    $scope.del = function(data){
        $scope.selectedItem = data;
        // $scope.instance.del(data);
    }
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
    var scope = $scope;
    $scope.edit = function(data){
        commitType='edit';
        $scope.instance.model =data;
        openModal();
    }
    
   $scope.goods ={endDate:new Date(),startDate:new Date()};
   $scope.addNewGoods = function(){
        $scope.instance.resetData();
        commitType='add';
        openModal() ;  
    }

    $scope.search = function(){
        $rootScope.$broadcast('datatables-reload')
    }

    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addthings);
    }
    $scope.searchParams = {key:'1'}
    $scope.commit = function(){        
        $scope.instance.commit( $rootScope.modalInstance,commitType);        
    }
    $scope.cancel = function(){
        $rootScope.modalInstance.dismiss('cancel');  
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
 }



 thingsController.$inject = ['$scope','$rootScope','$uibModal','views','thingsService']
export default angular.module('thingsController',[]).controller('thingsController',thingsController).name;