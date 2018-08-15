/**
 * Created by longHuang on 2016/10/25.
 */
(function () {
    'use strict'

    app.directive('crumb',['historyUtils','$location',function (historyUtils,$location) {
        return {
            restrict:'EA',
            templateUrl:'common/utils/toolsViews/crumbs.html?version='+new Date().getTime(),
            scope:{
                title:'@'
            },
            link:function (scope,element,attr) {
                scope.url = $location.url();
                
                scope.$watch('title',function(newTitle){
                	if(!newTitle){
                		return;
                	}
                	historyUtils.add({name:newTitle,url:scope.url,head:attr.head});
	                scope.titles = historyUtils.getAll();
	                //跳转事件
	                scope.drump = function (url) {
	                    if(url == scope.url)return;
	                    $location.url(url);
	                    $location.replace();
	                }
                })
            }
        }
    }]);

    app.factory('historyUtils',[function () {
        var his = [];
        return{
            add:add,
            getAll:getAll
        }

        function add(url) {
            if(url.head && url.head=="true"){
                his = [];
                his.push(url);
            }else{
                var i = haveName(his,url);
                i = i == -1 ? have(his,url) : i;
                if(i != -1){
                    his.splice(i,1,url);
                    his.splice(i+1,his.length-(i+1));
                }else{
                    if(his.length > 7)his.shift();
                    his.push(url);
                }
            }
        };

        function getAll() {
            return his;
        };

        function have(p,c) {
            var flag = -1;
            angular.forEach(p,function (o,i) {
                if(o.url.split('?')[0] == c.url.split('?')[0]){
                    flag = i;
                    return;
                }
            })
            return flag;
        }

        function haveName(p,c) {
            var flag = -1;
            angular.forEach(p,function (o,i) {
                if(o.name == c.name){
                    flag = i;
                    return;
                }
            })
            return flag;
        }
    }])
})()