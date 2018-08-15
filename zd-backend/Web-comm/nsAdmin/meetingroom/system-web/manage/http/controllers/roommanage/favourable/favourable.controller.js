
import Modal from '../../../utils/modal.util';
function favourableController($scope,$rootScope,$uibModal,$state,Fav,views) {
  
    $scope.instance  = new Fav();
    var commitType='add';
    $scope.dataUrl = baseUrl +'meetingperferential/listmap.do';
    $scope.otherDataUrl = baseUrl+'meetingperferential/findCompanyList.do'
    $scope.columns = [
        { mData: 'perferentialName' },
        { mData: 'companyName' },
        { mData: 'perferentialMargin' },
        { mData: 'useSocpe' } 
    ]
    $scope.otherColumns = [
        {
            "sClass": "text-center",
            "mData": "id",
            "render": function (data, type, full, meta) {
                return '<input type="checkbox"  onClick="selectOne(this)"  class="checkchild"   value="' + data + '" />';
            },
            "bSortable": false
        },
        { mData: 'name' },
        { mData: 'address' } 
    ]
    $scope.isOpen = true;
    $scope.selectedItem = null;
    $scope.del = function(data){
        $scope.selectedItem = data;
        // $scope.instance.del(data);
    }
    $scope.selectType =function(type){
       
        $scope.instance.favourableModel.perferentialType = type;
        
    }
   window.selectOne = function(obj){
       var $obj = $(obj);
       var id = $obj.val()
       if($(obj).is(':checked')){
          $scope.instance.list.push(id)
       }else{
        angular.forEach($scope.instance.list,function(it,i){
            if( it == id){
             $scope.instance.list.splice(i,1)
            }
        })
       }
      
   }
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
    $scope.edit = function(data){
        commitType='edit';
  
        $scope.instance.favourableModel =data;
        openModal();
        
    }
    $scope.search = function(){
        $rootScope.$broadcast('datatables-reload');
    }
    $scope.isSelectAll = false;
    $scope.selectAll = function(){
        $scope.isSelectAll = !$scope.isSelectAll;
        // if ($scope.isSelectAll){
            $scope.instance.list = [];
            $('.checkchild').each(function(){
                $(this).prop('checked',$scope.isSelectAll?'checked':'')
                if($scope.isSelectAll){
                    $scope.instance.list.push(this.value);
                }else{
                    $scope.instance.list 
                }
            })
          
    }
   
    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addfavourable);
    }
  
   $scope.addNewFav = function(){
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

 

favourableController.$inject = ['$scope','$rootScope','$uibModal','$state','favourableService','views']
export default angular.module('favourableController',[]).controller('favourableController',favourableController).name;