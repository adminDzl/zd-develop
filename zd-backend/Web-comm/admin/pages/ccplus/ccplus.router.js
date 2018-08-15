/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/ccplus/';
            var version = new Date().getTime();

            $stateProvider
                 //热点管理
                .state('app.ccInformation', {
                    url: '/ccInformation',
                    templateUrl: tpl + 'info/information_list.html?vesion=' + version,
                    resolve: load([tpl + 'info/controller/information_list.js','common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
                 //热点类型
                .state('app.infoCategory', {
                	url: '/infoCategory',
                	templateUrl: tpl + 'info/info_category.html?vesion=' + version,
                	resolve: load([tpl + 'info/controller/info_category.js',tpl + 'info/controller/tree.js'])
                })
                //订单管理
                .state('app.ccOrder', {
                	url: '/ccOrder',
                	templateUrl: tpl + 'order/order_list.html?vesion=' + version,
                	resolve: load([tpl + 'order/controller/order_list.js'])
                })
                
                //服务配置
                .state('app.serviceConfigPc', {
                    url: '/serviceConfigPc',
                    templateUrl: tpl + 'service/servicepc.html?vesion=' + version,
                    resolve: load([tpl + 'service/controller/servicepc.js',
            				tpl + '../baseinfo/utils/parkservicechoose/controller/parkservice_choose.js'])
                })
                //社交管理
                .state('app.ccSocial', {
                    url: '/ccSocial',
                    templateUrl: tpl + 'social/social_list.html?vesion=' + version,
                    resolve: load([tpl + 'social/controller/social_list.js','common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
                //banner管理
                .state('app.ccBanner', {
                    url: '/ccBanner',
                    templateUrl: tpl + 'banner/banner_list.html?vesion=' + version,
                    resolve: load([tpl + 'banner/controller/banner_list.js','common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
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