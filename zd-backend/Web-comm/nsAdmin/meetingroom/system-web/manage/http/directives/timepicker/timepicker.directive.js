 

var timepicker = require('bootstrap-timepicker');

require('bootstrap-timepicker/css/bootstrap-timepicker.min.css')
function timepickerDirective(){
    var dateFormat = function(date,fmt){// 
        
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
    }
    return {
        restrict:'E',
        scope:{
            model:'=',
            ph:'@'
        },
        template:'<input type="text" class="form-control" id="{{id}}" value="{{now}}" ng-model="model" placeholder="{{ph}}"/> <span class="input-group-btn"><button type="button" class="btn btn-default"  ><i class="glyphicon glyphicon-time"></i></button> </span>',
        link: function ($scope, elem) {
            var date = new Date();
            var id="Id_"+date.getTime()+parseInt(Math.random()*100000);
            $scope.id = id;        
             
            $scope.now =dateFormat(date,'hh:mm')
             
            setTimeout(function(){                
                $('#'+id).timepicker({showMeridian:false,'minuteStep':30});
            },1000)
         
            
        }
    }
}
 
timepickerDirective.$inject = []
export default angular.module('timepickerDirective',[]).directive('timepickerDirective',timepickerDirective).name;