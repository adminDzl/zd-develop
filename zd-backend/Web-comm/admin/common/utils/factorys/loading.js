/**
 * Created by longHuang on 2016/7/11.
 */
(function(){
    'use strict'

    app.factory('Loading',function($modal,$rootScope){
            var modal = undefined;
            return{
                show:show,
                close:close
            }

            function show(){
                // $rootScope.$broadcast('loading-start');
            }

            function close(){
                // $rootScope.$broadcast('loading-over');
            }
        });
    app.directive('uiLoading',function (uiLoad,$timeout) {
        return {
            restrict:'E',
            templateUrl:'common/utils/toolsViews/loading.html?version='+new Date().getTime(),
            // scope:{},
            // link:function (scope,e) {
            //     // var number = 1;
            //     // var timer = $timeout(function () {
            //     //     if(number > 0){
            //     //         number = 0;
            //     //         e.find('.loading-bg').fadeOut();
            //     //     }
            //     // },3000);
            //     scope.$on('loading-start',function (event,data) {
            //         if(timer && number == 1){
            //             $timeout.cancel(timer);
            //             timer = undefined;
            //             e.find('.loading-bg').fadeOut();
            //         }
            //         number++;
            //         console.log(number);
            //         e.find('.loading-bg').fadeIn();
            //     });
            //
            //     scope.$on('loading-over',function (event,data) {
            //         number--;
            //         $timeout(function () {
            //             if(number < 0)number = 0;
            //             if(number == 0){
            //                 e.find('.loading-bg').fadeOut();
            //             }
            //         },300)
            //     })
            // }
        }
    })
})()