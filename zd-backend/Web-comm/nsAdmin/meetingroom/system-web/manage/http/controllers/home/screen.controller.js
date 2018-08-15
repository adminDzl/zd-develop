import Cache from "../../utils/cache.util";
import Tools from '../../utils/tools.util';
 
// var jQuery = require('jquery');
// require('ui/ui-load');
// require('ui/ui-jp.config.js');
// require('ui/ui-jp.js');
// require('ui/ui-nav.js');
// require('ui/ui-toggle.js');
// require('ui/ui-client.js');

function screenController($scope,$rootScope,Proxy,$state) {
    $scope.screenList = [];
    $scope.list = [];
    var date = new Date();
    var day = Tools.dateFormat(date,'yyyy-MM-dd')
    Proxy.screen({}).then(xhr=>{
        if(xhr.result){
            // $scope.list = xhr.data;
            angular.forEach(xhr.data,(it)=>{
              
                if(it.orderTime.length>0){
                    
                    
                    angular.forEach(it.orderTime,(data)=>{
                        
                        if(data.useTime){
                            var useTime = data.useTime.split(' ');
                            if(useTime[0]==day){
                                $scope.list.push()
                            }
                        
                        }
                       
                    })
                }
            })
        }
    })
}

 
screenController.$inject = ['$scope','$rootScope','proxy','$state']
export default angular.module('screenController',[]).controller('screenController',screenController).name;