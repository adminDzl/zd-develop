 
 import Msg from '../../utils/msg.util';
function addOrderController($scope,$rootScope,$uibModal,views,Orders) {
    $scope.instance = new Orders();
    $scope.instance.initAdd()
    var watchs = $scope.$watch('instance.model.meetingId',function(){
        $scope.instance.queryByMeeting()
    })
    
    $scope.sum = ()=>{
        var total =0;
      
        angular.forEach($scope.instance.unfrees,(it)=>{
            
            if(it.number>0 && it.select==true){
                total += it.price*it.number;
            }
        })        
        return total;
    }
    var now = new Date();
    var nowHour = now.getHours();
    var nowMinu = now.getMinutes();
    var temp = new Date();
    var timeWatch1 = $scope.$watch('instance.model.beginTime',function(v1,v2){ 
            if(v1){
                var arr = v1.split(':');
                var h = 0;
                var m = 0;
                temp.setHours(arr[0])
                temp.setMinutes(arr[1]);
                if(temp.getTime()<now.getTime()){
                    Msg.setText('预定场地开始时间要大于当前时间')
                    if(nowMinu<30){
                        m = 30;
                        h = nowHour;
                    }else{
                        h = nowHour+1;
                        m = 0;
                    }
                    $scope.instance.model.beginTime =h+':'+m;
                }
            }
    })
    var timeWatch2 = $scope.$watch('instance.model.endTime',function(v1,v2){ 
        if(v1){
            var arr = v1.split(':');
            var h = 0;
            var m = 0;
            temp.setHours(arr[0])
            temp.setMinutes(arr[1]);
            if(temp.getTime()<now.getTime()){
                Msg.setText('预定场地结束时间要大于当前时间')
                if(nowMinu<30){
                    m = 30;
                    h = nowHour+1;
                }else{
                    h = nowHour+2;
                    m = 0;
                }
                $scope.instance.model.endTime =h+':'+m;
            }
        }
})
    $scope.$on('$destroy',function(){
        $scope.instance = null;
        watchs();
        timeWatch1()
        timeWatch2();
    })
}

addOrderController.$inject = ['$scope','$rootScope','$uibModal','views','ordersService']
export default angular.module('addOrderController',[]).controller('addOrderController',addOrderController).name;