 
 
import Modal from '../../utils/modal.util';
import Msg from '../../utils/msg.util';
function ordersController($scope,$rootScope,$uibModal,views,Orders,$state) {
    $scope.instance = new Orders();
    $scope.instance.init();
    $scope.dataUrl = baseUrl+'meetingorder/listmap.do';
    $scope.columns = [
        { mData: 'orderNo' },      
        { mData: 'meetingName' },
        { mData: 'orderTime' },
        { mData: 'contactName' },
        { mData: 'orderMoney' },
        { mData: 'payType' } ,
        { mData: 'lastPayType' } ,
        { mData: 'orderStatus' } ,
        { mData:'processingName'}
    ]
    $scope.view = (it)=>{
     
        $state.go('manage.detailorder',{id:it.id})
    }
    $scope.search = function(){
         $scope.instance.query();
    }
    $scope.currentOrder = null;
    $scope.saveOrderFen = function(){
        $scope.instance.saveOrderFen($scope.currentOrder,$rootScope.modalInstance)
    }
    $scope.signSelect = (it)=>{
        angular.forEach( $scope.instance.users,(data)=>{
            data.select = false;
        })
        it.select = true;
    }
    $scope.fen = (data)=>{      
        $scope.currentOrder = data; 
        $scope.instance.queryTakeOrderPerson(data).then(xhr=>{
             
            if(xhr.result){
                
                $scope.instance.users = xhr.data;
            }else{
                Msg.setText('载入数据失败')
            }
            Modal.openModal($rootScope,$scope,$uibModal,views.orderFen);
        })
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}

ordersController.$inject = ['$scope','$rootScope','$uibModal','views','ordersService','$state']
export default angular.module('ordersController',[]).controller('ordersController',ordersController).name;