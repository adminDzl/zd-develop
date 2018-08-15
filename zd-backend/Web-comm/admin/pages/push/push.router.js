/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/push/';
            var version = new Date().getTime();

            $stateProvider


                .state('app.app_push', {
                    url: '/app_push',
                    templateUrl: tpl + 'listAPPPush.html?vesion='+version,
                    resolve:load(tpl + 'js/listAPPPush.js')
                })
                .state('app.sms_push', {
                    url: '/sms_push',
                    templateUrl: tpl + 'listSMSPush.html?vesion='+version,
                    resolve:load(tpl + 'js/listSMSPush.js')
                })
                .state('app.email_push', {
                url: '/email_push',
                templateUrl: tpl + 'listEmailPush.html?vesion='+version,
                resolve:load(tpl + 'js/listEmailPush.js')
                })
                .state('app.classified_message',{
                    url: '/classified_message',
                    templateUrl: tpl + 'listClassifiedMessage.html?vesion='+version,
                    resolve:load([tpl + 'js/listClassifiedMessage.js','common/thrid/libs/jquery/jquery.form.js'])
                })

                .state('app.push_user',{
                    url: '/push_user',
                    templateUrl: tpl + 'listPushUser.html?vesion='+version,
                    resolve:load(tpl + 'js/listPushUser.js')
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
    );

})();

var path = "/push";

var pageconfig = {
    pageSize : 10
};