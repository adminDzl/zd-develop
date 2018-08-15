
import Modal from '../../../utils/modal.util';
import Msg from '../../../utils/msg.util';
function goodsController($scope,$rootScope,$uibModal,$state,Goods,views) {   
   $scope.instance = new Goods();
   $scope.columns = [
       { mData: 'name' },     
       { mData: 'params' },
       { mData: 'thingsAmount' },
       { mData: 'freeType' },
       { mData: 'price' },
       { mData: 'unit' } 
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
 
    { mData: 'name' },     
    { mData: 'params' },
  
    { mData: 'freeType' },
    { mData: 'amount' },
    { mData: 'price' },
    { mData: 'unit' } 
]
    window.test = function(obj){
        var checked = $(obj).is(':checked');
        // var id = $(obj).val();
        //  $scope.instance.checkSelect(id,checked)
        setInputEditable($(obj),checked)
    }
    $scope.isSelectAll = false;
    $scope.selectAll = function(){
        $scope.isSelectAll = !$scope.isSelectAll;
        // if ($scope.isSelectAll){
            $('.input_edit').each(function(){
                setInputEditable($(this),$scope.isSelectAll)
            })
            $('.checkchild').each(function(){
                $(this).prop('checked',$scope.isSelectAll?'checked':'')
            })
        // }
    }
    function setInputEditable($obj,checked){
       var input =  $obj.closest('tr').find('td').eq(7).find('input')
       
        if(checked){
            input.removeAttr('disabled')
        }else{
            input.attr('disabled',true)
        }
        
    }
   $scope.dataUrl = baseUrl+'meetingtings/listmap.do';
   $scope.otherDataUrl = baseUrl+'meetingtings/findThingsList.do';
   $scope.selectedItem = null;
   $scope.del = function(data){
     
     $scope.selectedItem = data;
   }
   $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
    }
   $scope.edit = function(data){
     
   }
    $scope.search = function(){
        $rootScope.$broadcast('datatables-reload');
    }
    $scope.goods ={endDate:new Date(),startDate:new Date()};
    var commitType = 'add'
    $scope.addNewGoods = function(){
        commitType = 'add';
        openModal();
  
    }
    $scope.getInputVal = function(data,val){
        if(parseInt(val)>parseInt(data.amount)){
            Msg.setText('配置数量不能超过库存数量')
            return false;
        }         
       
    }
    function openModal (){
        Modal.openModal($rootScope,$scope,$uibModal,views.addgoods);
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

 
goodsController.$inject = ['$scope','$rootScope','$uibModal','$state','goodsService','views']
export default angular.module('goodsController',[]).controller('goodsController',goodsController).name;