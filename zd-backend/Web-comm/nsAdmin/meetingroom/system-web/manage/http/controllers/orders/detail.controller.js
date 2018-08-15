import Modal from '../../utils/modal.util';
function detailController ($rootScope,$scope,Detail,$uibModal,views){
    $scope.backmoney = 0;
    $scope.instance = new Detail();
    $scope.closeOrder = function(){
        if($scope.instance.model.orderStatus==2){
            $scope.backmoney = $scope.instance.model.firstMoney;
        }else if($scope.instance.model.orderStatus==3){
            $scope.backmoney = $scope.instance.model.orderMoney;
        }
        Modal.openModal($rootScope,$scope,$uibModal,views.closeOrder);
    }   
    $scope.addServ = function(){//添加服务
        Modal.openModal($rootScope,$scope,$uibModal,views.addServ);
    }
    $scope.editServ = function(){//修改服务
        Modal.openModal($rootScope,$scope,$uibModal,views.editServ);
    }
    $scope.editGoods = function(){//修改物品
        Modal.openModal($rootScope,$scope,$uibModal,views.editOrderGoods);
    }
    $scope.editAddServ = ()=>{//保存修改服务
        $scope.instance.editAddServ( $rootScope.modalInstance);
    }
    $scope.commitNewAddSer = function(){//保存新增服务
        $scope.instance.addNewAddSer( $rootScope.modalInstance)
    }
    $scope.updateOrderThings = function(){
        $scope.instance.updateOrderThings($rootScope.modalInstance);
    }
    $scope.cancel = function(){
        $rootScope.modalInstance.dismiss('cancel');  
    }
    $scope.commit = function(){
        $scope.instance.backmoney();
    }
}
detailController.$inject = ['$rootScope','$scope','detailOrderServive','$uibModal','views'];
export default angular.module('detailController',[]).controller('detailController',detailController).name;