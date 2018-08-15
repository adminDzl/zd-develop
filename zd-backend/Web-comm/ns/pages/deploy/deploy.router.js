/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/deploy/';
            var version = new Date().getTime();

            $stateProvider
            
            	//应用管理
                .state('app.depApps', {
                    url: '/depApps',
                    templateUrl: tpl + 'dep/app_list.html?vesion=' + version,
                    resolve: load([tpl + 'dep/css/deploy.css?vesion=' + version,tpl + 'dep/controller/app_list.js','common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
            	//订单管理
                .state('app.depOrder', {
                    url: '/depOrder',
                    templateUrl: tpl + 'dep/order_list.html?vesion=' + version,
                    resolve: load([tpl + 'dep/controller/order_list.js',
                    			  tpl + 'dep/css/deploy.css?vesion=' + version,'common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
            	//部署应用的运行状态
                .state('app.depRunApps', {
                    url: '/depRunApps',
                    templateUrl: tpl + 'dep/app_runlist.html?vesion=' + version,
                    resolve: load([tpl + 'dep/css/deploy.css?vesion=' + version,tpl + 'dep/controller/app_runlist.js','common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
                
                //部署应用的接口信息
                .state('app.apiinfo', {
                    url: '/apiinfo',
                    templateUrl: tpl + 'apiinfo/list.html?vesion=' + version,
                    resolve: load([tpl + 'apiinfo/controller/list.js?vesion=' + version])
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