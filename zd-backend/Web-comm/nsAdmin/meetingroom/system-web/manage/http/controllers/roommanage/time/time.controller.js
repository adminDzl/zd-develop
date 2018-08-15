
import Modal from '../../../utils/modal.util';
function timeController($scope,$rootScope,$uibModal,$state,Times,views) {
  
    $scope.instance  = new Times();
    var commitType='add';
    $scope.dataUrl = baseUrl +'meetingtime/listmap.do';
    $scope.columns = [
        { mData: 'date' },
        { mData: 'week' },
        { mData: 'startTime' },
        { mData: 'endTime' },
        { mData: 'status' } 
    ]
    $scope.isOpen = true;
    $scope.selectedItem = null;
    $scope.del = function(data){
        $scope.selectedItem = data;
        // $scope.instance.del(data);
    }
    $scope.setOpenStats = function(){
     
    }
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
    $scope.edit = function(data){
        commitType='edit';
        $scope.instance.timesModel =data;
        openModal();
        
    }
    $scope.selectMeetingStatus = function(type){
        $scope.instance.timesModel.meetingStatus = type;
    }
    
    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addtime);
    }
  
   $scope.addNewTime = function(){
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

 
timeController.$inject = ['$scope','$rootScope','$uibModal','$state','timeService','views']
export default angular.module('timeController',[]).controller('timeController',timeController).name;