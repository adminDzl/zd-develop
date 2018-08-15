/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/log/';
            var version = new Date().getTime();

            $stateProvider
            //日志管理
            .state('app.t_log_rule', {
                url: '/t_log_rule',
                templateUrl: tpl + 't_logrule_list.html?vesion=' + version,
                resolve: load(tpl + 'controller/t_logrule_list.js')
            })
            .state('app.t_log_login', {
                url: '/t_log_login',
                templateUrl: tpl + 't_login_list.html?vesion=' + version,
                resolve: load(tpl + 'controller/t_login_list.js')
            })
            .state('app.t_log_action', {
                url: '/t_log_action',
                templateUrl: tpl + 't_log_list.html?vesion=' + version,
                resolve: load(tpl + 'controller/t_log_list.js')
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