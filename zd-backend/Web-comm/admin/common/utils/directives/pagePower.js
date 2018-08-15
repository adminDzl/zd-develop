/**
 * 页面元素权限控制，在元素上添加 power-key="htmlkey" 
 */
(function () {
    'use strict'
    
	app.directive('powerKey',function ($localStorage) {
        return {
            restrict:"A",
            scope:{
            	name: "@" 
            },
            link:function (scope,element,attrs) {
            	var required = attrs.powerKey
            	var hasPower = false;
                var currPrivs = $localStorage.currPrivs;
                if(currPrivs){
                	for(var x in currPrivs){
                		var p = currPrivs[x];
                		if(p==required){
                			hasPower = true;
                			break;
                		}
                	}
                } 
                if(!hasPower){
                	element.css('display','none');
                }             
            }
        }
    });
})()