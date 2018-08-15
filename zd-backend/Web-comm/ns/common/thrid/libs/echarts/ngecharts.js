/**
 * Created by liekkas.zeng on 2015/1/7.
 */
(function () {
    'use strict'
    app.directive('ngEcharts',[function(){
        return {
        	restrict:'EA',
        	scope:{
                option:'=ecOption',
                config:'=ecConfig'
            },
            template: '<div> charts </div>',
            link: function(scope,element,attrs,ctrl){
                function refreshChart(){
                    var theme = (scope.config && scope.config.theme) ? scope.config.theme : 'default';
                    
                    var ele =  element.find('div')[0];
                    var parent = element['context'];
                    ele.style.width =parent.style.width;
                    ele.style.height =parent.style.height;
                    
                    var chart = echarts.init(ele,theme);
                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }

                    if(scope.config && scope.config.dataLoaded){
                        chart.setOption(scope.option);
                        chart.resize();
                        chart.hideLoading();
                    }

                    if(scope.config && scope.config.event){
                        if(angular.isArray(scope.config.event)){
                            angular.forEach(scope.config.event,function(value,key){
                                for(var e in value){
                                    chart.on(e,value[e]);
                                }
                            });
                        }
                    }
                };

                //自定义参数 - config
                // event 定义事件
                // theme 主题名称
                // dataLoaded 数据是否加载

                scope.$watch(
                    function () { return scope.config; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );

                //图表原生option
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            }
        };
    }]);
})()
