
import Modal from '../../utils/modal.util';
/**
 * 
 * @param {*}外屏信息膳食
 * @param {*}  
 * @param {*}  
 * @param {*} views 
 * @param {*} showInfoService 
 * @param {*}  
 */
function showInfoController($scope,$rootScope,$uibModal,views,ShowInfo,$state){
  
    var commitType = 'add'
    $scope.instance = new ShowInfo();
    $scope.searchParams ={freeType:'',name:''};
    $scope.columns = [{
                    mData:'showDate'
                },{
                    mData:'startTime'
                },{
                    mData:'endTime'
                },{
                    mData:'showTopic'
                },{
                    mData:'showCount'                
                }];
    $scope.commit = function(){
       
            $scope.instance.saveOrUpdate( $rootScope.modalInstance,commitType);      
        
        
    }

    $scope.dataUrl = baseUrl +'showinfo/listmap.do';
    function openModal(){
        Modal.openModal($rootScope,$scope,$uibModal,views.addshowinfo);
    }
    $scope.search = function(){
        
        $rootScope.$broadcast('datatables-reload')
    }
    $scope.addNewShowInfo = function(){
        commitType = 'add';
        $scope.instance.reset();
        openModal()
    }
    $scope.uploadSuccess = function(data){
      
    }
    $scope.selectedItem =null;
    $scope.del = function(data){
        $scope.selectedItem = data;
    }
    $scope.edit = function(data){
        commitType='edit';
        // $scope.instance.vasModal =data;
        $scope.instance.getById(data,openModal) 
     
    }
    $scope.onSuccess = function(data){
       $scope.instance.addPicTime(data,'')
    }
    $scope.doYes = function(){
        $scope.instance.del($scope.selectedItem );
       
    }
    $scope.see = function(data){
      
        // var url = $state.href('see',{id:data.id})
        // window.open(url)
        $state.go('see',{id:data.id})
    }
    $scope.addMore = function(){
        $scope.instance.pics.push({id:'',tm:''})
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
 

showInfoController.$inject = ['$scope','$rootScope','$uibModal','views','showInfoService','$state']
export default angular.module('showInfoController',[]).controller('showInfoController',showInfoController).name;