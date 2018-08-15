
import Modal from '../../utils/modal.util';
import Tools from '../../utils/tools.util'
/**
 * 
 * @param {*}外屏信息膳食
 * @param {*}  
 * @param {*}  
 * @param {*} views 
 * @param {*} showInfoService 
 * @param {*}  
 */
function seeController($scope,$rootScope,Proxy,state,stateParams){
    
   var id = stateParams.id;
    var weekday = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];//getDay
    var date = new Date();
    $scope.date = Tools.dateFormat(date,'yyyy-MM-dd');
    $scope.time = Tools.dateFormat(date,'hh:mm')
    $scope.week = weekday[date.getDay()];
    $scope.entity = {};
    $scope.detail = {};
    
    $scope.showIndex = 0;
    $scope.height = parseInt(angular.element('.meet-main').height())
    Proxy.findShowInfoById({id:id}).then(xhr=>{
        if(xhr.result){
         $scope.entity = xhr.data.entity;
         $scope.detail = xhr.data.detail;
         if(xhr.data.detail.length>0){
            
            var i = 0 ;
            var showTime = xhr.data.detail[0].showTime * 60 *1000 //
            setInterval(()=>{
                $scope.showIndex++;
                if($scope.showIndex>=xhr.data.detail.length){
                    $scope.showIndex =0;
                }
                $scope.$apply()
                
            },showTime)
         }
        
        }else{
           Msg.setText('读取详情失败')
        }
    })
    $scope.$on('$destroy',function(){
        $scope.instance = null;
    })
}
 

seeController.$inject = ['$scope','$rootScope','proxy','$state','$stateParams']
export default angular.module('seeController',[]).controller('seeController',seeController).name;