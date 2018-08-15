/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/synchronize/';
            var version = new Date().getTime();

            $stateProvider
            
                .state('app.syncOpList', {
                    url: '/syncOpList',
                    templateUrl: tpl + 'sync/op_list_list.html?vesion=' + version,
                    resolve: load(tpl + 'sync/controller/op_list.js')
                })
                .state('app.syncOpJob', {
                    url: '/syncOpJob',
                    templateUrl: tpl + 'sync/op_job_list.html?vesion=' + version,
                    resolve: load(tpl + 'sync/controller/op_job.js')
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