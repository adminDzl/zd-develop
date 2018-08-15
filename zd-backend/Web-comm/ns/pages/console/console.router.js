/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/';
            var version = new Date().getTime();

            $stateProvider
            
            	//业务数据管理
                .state('app.table_info', {
                    url: '/table_info',
                    templateUrl: tpl + 'console/reportSetting/settings_list.html?vesion=' + version,
                    resolve: load(tpl + 'console/reportSetting/controller/cs_report_setting_list.js')
                })
                // .state('app.table_edit', {
                //     url: '/table_edit',
                //     templateUrl: tpl + 'console/reportSetting/settings_edit.html?vesion=' + version,
                //     resolve: load([tpl + 'console/reportSetting/controller/reportSetting_edit.js',
                //                    'common/thrid/libs/echarts/echarts.min.js',
                //                    'common/thrid/libs/echarts/ngecharts.js'])
                // })
                //数据图表
                .state('app.analysis', {
                    url: '/analysis',
                    templateUrl: tpl + 'console/analysis/analysis.html?vesion=' + version,
                    resolve: load([tpl + 'console/analysis/controller/analysis.js',
                                   'common/thrid/libs/echarts/echarts.min.js',
                                   'common/thrid/libs/echarts/ngecharts.js'])
                })
                ;

            function load(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLazyLoad, $q) {
                            var deferred = $q.defer();
                            var promise = false;
                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                            if (!promise) {
                                promise = deferred.promise;
                            }
                            angular.forEach(srcs, function (src) {
                                promise = promise.then(function () {
                                    if (JQ_CONFIG[src]) {
                                        return $ocLazyLoad.load(JQ_CONFIG[src]);
                                    }
                                    angular.forEach(MODULE_CONFIG, function (module) {
                                        if (module.name == src) {
                                            name = module.name;
                                        } else {
                                            name = src;
                                        }
                                    });
                                    return $ocLazyLoad.load(name);
                                });
                            });
                            deferred.resolve();
                            return callback ? promise.then(function () {
                                return callback();
                            }) : promise;
                        }]
                }
            }
        }
    )
})()