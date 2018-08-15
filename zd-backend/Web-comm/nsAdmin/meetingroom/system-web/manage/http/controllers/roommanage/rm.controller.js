
import Tools from '../../utils/tools.util';
import Msg from '../../utils/msg.util';
function rmController($rootScope,$scope,$state){
    $scope.mid = Tools.getMeetingId();
    $rootScope.isEdit=($scope.mid)?true:false;
    $scope.currentTab = 'addroom';
    $scope.changeTab = function(tab){
        $scope.currentTab  = tab;
       
        if(Tools.getMeetingId()==0 && tab!='addroom'){
            Msg.setText('请先创建场地信息，才能配置附属信息。')
            $scope.currentTab  = 'addroom'
            $state.go('manage.meetingroom.addroom')
            return false;
        }
       
        $state.go('manage.meetingroom.'+tab);
    }
    
    if($state.current && $state.current.act){
       
        $scope.changeTab($state.current.act);
      }
}
 
rmController.$inject = ['$rootScope','$scope','$state']
export default angular.module('rmController',[]).controller('rmController',rmController).name;