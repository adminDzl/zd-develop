
import Modal from '../../utils/modal.util';
import Msg from '../../utils/msg.util';
function staffController($scope,$rootScope,Staffs,$uibModal,views){
    $scope.instance = new Staffs();
    $scope.instance.init();
    $scope.dataUrl = baseUrl+'personinfo/listmap.do';
    $scope.queryMember = baseUrl +'personinfo/queryMember.do';
  
    $scope.columns =[{mData:'personName'}, {mData:"personPhone"},{mData:"roomList"},{mData:"orderTotal"},{mData:"onLineOrder"}];
    $scope.memberColums = [
        {
            "sClass": "text-center",
            "mData": "id",
            "render": function (data, type, full, meta) {
                return '<input type="checkbox"    class="checkchild" onClick="setStaff(this)"  value="' + data + '" />';
            },
            "bSortable": false
        },{mData:'realname'},{mData:'mobile'},{mData:'email'},{mData:'name'}];
    window.setStaff = (elem)=>{
        var id = angular.element(elem).val();
        $scope.instance.setStaff(id);
    }
    $scope.edit = (data)=>{        
        $scope.instance.model = data;
        closeModal()
        Modal.openModal($rootScope,$scope,$uibModal,views.staffEdit);
    }
    $scope.addNewStaff = ()=>{
        closeModal()
        Modal.openModal($rootScope,$scope,$uibModal,views.staffQuery);
    }
    function closeModal(){
        if($rootScope.modalInstance){
            $rootScope.modalInstance.dismiss('cancel');  
        }
    }
    $scope.cancelEidt = ()=>{
        closeModal();
    }
    $scope.edit = (data)=>{
        closeModal()
        $scope.instance.model = data;
        Modal.openModal($rootScope,$scope,$uibModal,views.staffEdit);
    }
    $scope.commitEdit =()=>{
        $scope.instance.commitEdit($rootScope.modalInstance);
    }
    $scope.cancelSel = function(){
        closeModal();
    }
    $scope.selMember = ()=>{
        $scope.instance.addUser($rootScope.modalInstance)
        //  Modal.openModal($rootScope,$scope,$uibModal,views.staffRole);
    }
    $scope.role = (data)=>{
        $scope.instance.model = data;
        $scope.instance.sysRoomData();
        Modal.openModal($rootScope,$scope,$uibModal,views.staffRole);
    }
    $scope.saveRole = ()=>{
        $scope.instance.saveRole($rootScope.modalInstance)
    }
    $scope.search = ()=>{
        $rootScope.$broadcast('datatables-reload');
    }
    $scope.view = (data)=>{
        
        $scope.instance.viewDetail(data)
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
staffController.$inject =['$scope','$rootScope','staffService','$uibModal','views'];
export default angular.module('staffController',[]).controller('staffController',staffController).name;