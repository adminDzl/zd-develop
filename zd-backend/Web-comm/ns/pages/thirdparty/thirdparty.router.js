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
                .state('app.tp_user', {
                    url: '/tp_user',
                    templateUrl: tpl + 'thirdparty/user/user_list.html?vesion=' + version,
                    resolve: load(tpl + 'thirdparty/user/controller/user_list.js')
                })
                .state('app.client', {
                    url: '/client',
                    templateUrl: tpl + 'thirdparty/client/client.html?vesion=' + version,
                    resolve: load(tpl + 'thirdparty/client/controller/client.js')
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