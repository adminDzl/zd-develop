/**
 * 定时器
 */
app.factory('TimerRun', function ($interval,$location) {
    var runList = [];
    
    var run = function(runObj){
    	var pathName = $location.url();
    	var existFlag =  false;
		angular.forEach(runList,function(obj,i){
			if(obj.url == pathName){
				existFlag = true;
			}
			else{
				$interval.cancel(obj.timer);
			}
		});  
		if(existFlag){
			return;
		}
		runList = [];//重新初始化runList
		var timer = $interval(function(){
			if(runObj.url == $location.url()){
				runObj.runFuc();
			}
			else{
				$interval.cancel(runObj.timer);
				runList.splice(runObj,1);
			}
		},60000);
		runObj.timer = timer;
		runList.push(runObj);
    }
    
    return {
    	run: run
    }
    
});

