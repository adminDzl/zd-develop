
 import Cache  from '../../../utils/cache.util';
function addController($scope,$rootScope,$uibModal,views,Room,$state) {
    
    var commitType =$rootScope.isEdit?'edit':'add';
    var meetingRoomEdit = Cache.get('edit_meetingroom_info');
   
    $scope.instance = new Room();    
    $scope.instance.init();
    if(meetingRoomEdit){
        $scope.instance.startEdit(meetingRoomEdit);
    }else{
        $scope.instance.reset();
    }
    $scope.isDisplay = true;
    $scope.selectRadio = function(it,items){
        angular.forEach(items,function(item){            
                item.checked =false;
                item.number = '';
        });
        it.checked = true;
    }
    $scope.roomImg = function(id){
        //场地
        $scope.instance.roomImgs.push(id);
       
    }
    $scope.delRoomImg = function(it,type){
     
        $scope.instance.delAttach(it,type)
    }
    $scope.showImg = function(id){
        //显示屏
        $scope.instance.showImgs.push(id);
    }
    $scope.attach = function(id){
        //附件
        $scope.instance.attachs.push(id);
    }
    $scope.isShow = function(){        
         $scope.instance.roomModal.isDisplay = $scope.isDisplay?'0':'1'
    }
    $scope.commit = function(){
        $scope.instance.saveOrUpdate(commitType);
    }
    $scope.getText = function(text){
       
        $scope.instance.roomModal.description = text;
    }
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
    $scope.meetingroom ={endDate:new Date(),startDate:new Date()}
}

 
addController.$inject = ['$scope','$rootScope','$uibModal','views','roomService','$state']
export default angular.module('addController',[]).controller('addController',addController).name;