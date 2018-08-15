 
import Modal from '../../utils/modal.util';
function basedataController($scope,$rootScope,$uibModal,views,BaseData,$state) { 
    $scope.baseDataGroupUrl = baseUrl +'dictionarygroup/listmap.do';  
    $scope.instance = new BaseData();
     
    // $scope.instance.loadGroupUrl = $scope.baseDataGroupUrl;
    $scope.instance.loadGroup();
    var type ='basedata';
    var commitType ='';
    if($state.current.url && $state.current.url=='/basedata'){
      
        type = 'basedata'
    }else{
        type = 'group'
    }
    $scope.search = function(){
        $rootScope.$broadcast('datatables-reload')
    }
    $scope.columns = [
        { mData: 'name' },     
        { mData: 'code' }
        // { mData: 'status' }
    ]
    $scope.basecolumns =[
        {mData:'id'},
        { mData: 'name' },     
        {mData:'groupCode'},
        { mData: 'code' }
        // { mData: 'status' }
    ]
    $scope.selectedItem = null;
    $scope.baseDataUrl = baseUrl+'dictionary/listmap.do';
    $scope.doYes = function(){
        if(type=='basedata'){
            $scope.instance.delBase($scope.selectedItem );
        }else{
            $scope.instance.delGroup($scope.selectedItem );
        } 
    }
    $scope.delGroup = function(data){
        $scope.selectedItem = data;
    }
    $scope.editGroup  = function(data){
        commitType='edit';
        $scope.instance.groupModal =data;
        openModal();
    }
    $scope.delBaseData = function(data){
        $scope.selectedItem = data;
    }

    $scope.editBaseData = function(data){
        commitType='edit';
        $scope.instance.dataModal =data;
       
        openModal();
    }
    function openModal(){
        var temp = '';
        if(type=='basedata'){
            temp =views.addbasedata
        }else{
            temp = views.addbasedatagroup
        }
        Modal.openModal($rootScope,$scope,$uibModal,temp);
    }
    $scope.goods ={endDate:new Date(),startDate:new Date()};
    $scope.addNewData = function(){
        commitType='add';
        $scope.instance.dataModal = {id:'',name:'',code:'',status:'',groupCode:''};
        $scope.instance.groupModal = {id:'',name:'',code:'',status:''};
        openModal();
    
    }

    $scope.commit = function(){
        if(type=='basedata'){
            $scope.instance.saveOrUpdateBase( $rootScope.modalInstance,commitType);      
        }else{
            $scope.instance.saveOrUpdateGroup( $rootScope.modalInstance,commitType);      
        }
        
    }
    $scope.cancel = function(){
        $rootScope.modalInstance.dismiss('cancel');  
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}

 
basedataController.$inject = ['$scope','$rootScope','$uibModal','views','basedataService','$state']
export default angular.module('basedataController',[]).controller('basedataController',basedataController).name;