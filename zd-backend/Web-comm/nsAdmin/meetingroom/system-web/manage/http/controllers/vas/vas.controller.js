 
import Modal from '../../utils/modal.util';
/**
 * 
 * @param {*}主菜单增值服务  后台配置
 * @param {*}  
 * @param {*}  
 * @param {*} views 
 * @param {*} vasService 
 * @param {*}  
 */
function vasController($scope,$rootScope,$uibModal,views,Vas,$state){
    
    var commitType = 'add'
    $scope.instance = new Vas();
    $scope.searchParams ={serviceTypeCode:'',serviceName:''};
    $scope.columns = [{
                    mData:'serviceTypeName'
                },{
                    mData:'serviceName'
                },{
                    mData:'servicePrice'
                
                },{
                    mData:'attach'
                }];
    $scope.commit = function(){
       
            $scope.instance.saveOrUpdate( $rootScope.modalInstance,commitType);      
        
        
    }

    $scope.dataUrl = baseUrl +'addservice/listmap.do';
    function openModal(){
        Modal.openModal($rootScope,$scope,$uibModal,views.addvas);
    }
    $scope.search = function(){
        
        $rootScope.$broadcast('datatables-reload')
    }
    $scope.addNewVas = function(){
        commitType = 'add';
        $scope.instance.reset();
        openModal()
    }
    $scope.uploadSuccess = function(data){
        
        $scope.instance.addAttach(data);
    }
    $scope.selectedItem =null;
    $scope.del = function(data){
        $scope.selectedItem = data;
    }
    $scope.edit = function(data){
        commitType='edit';
        // $scope.instance.vasModal =data;
        $scope.instance.getById(data).done(function(){
            openModal();
        })
     
    }
    $scope.doYes = function(){
         
            $scope.instance.del($scope.selectedItem );
       
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
 
vasController.$inject = ['$scope','$rootScope','$uibModal','views','vasService','$state']
export default angular.module('vasController',[]).controller('vasController',vasController).name;