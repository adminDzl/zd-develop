
import Modal from '../../../utils/modal.util';
import Msg from '../../../utils/msg.util';
function valueaddController($scope,$rootScope,$uibModal,$state,Values,views) {   
   $scope.instance = new Values();
   $scope.instance.getAddtype();
   $scope.columns = [
       { mData: 'serviceTypeName' },     
       { mData: 'serviceName' },
       { mData: 'servicePrice' },
       { mData: 'fileName' } 
   ]
   $scope.otherColumns = [
    {
        "sClass": "text-center",
        "mData": "id",
        "render": function (data, type, full, meta) {
            return '<input type="checkbox"    class="checkchild" onClick="test(this)"  value="' + data + '" />';
        },
        "bSortable": false
    },
 
    { mData: 'serviceTypeName' },     
    { mData: 'serviceName' },
    { mData: 'servicePrice' },
    { mData:'fileName'}
     
]
    window.test = function(obj){
        var checked = $(obj).is(':checked');
       
    }
    window.getAttach = function(id){
       
        $scope.instance.getAttach(id)
    }
    $scope.isSelectAll = false;
    $scope.selectAll = function(){
        $scope.isSelectAll = !$scope.isSelectAll;
             
            $('.checkchild').each(function(){
                $(this).prop('checked',$scope.isSelectAll?'checked':'')
            })
       
    }
    
   $scope.dataUrl = baseUrl+'meetingaddservice/listmap.do';
   $scope.otherDataUrl = baseUrl+'meetingaddservice/findaddservicelist.do';
   $scope.selectedItem = null;
   $scope.del = function(data){ 
         $scope.selectedItem = data;
   }
   $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
   $scope.edit = function(data){
         $scope.selectedItem = data;
   }
    $scope.search = function(){
        $rootScope.$broadcast('datatables-reload');
    }
    $scope.model = {}
    $scope.view = function(data){
        $scope.model = data;
        Modal.openModal($rootScope,$scope,$uibModal,views.addvasDetail);
    }
    var commitType = 'add'
    $scope.addNewValues = function(){
        commitType = 'add';
        openModal();  
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addvalues);
    }
    $scope.commit = function(){
        
        $scope.instance.saveOrUpdate($rootScope.modalInstance,commitType)
        // $rootScope.modalInstance.close(1); 
    }
    $scope.cancel = function(){
         $rootScope.modalInstance.dismiss('cancel');  
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}

 
valueaddController.$inject = ['$scope','$rootScope','$uibModal','$state','valuesService','views']
export default angular.module('valueaddController',[]).controller('valueaddController',valueaddController).name;