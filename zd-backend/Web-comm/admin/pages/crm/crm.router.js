/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/crm/';
            var version = new Date().getTime();

            $stateProvider
	            //应用设置 - 数据字典
	            .state('app.crm_dict',{
	                url: '/crm_dict',
	                templateUrl: tpl + 'common/dict/list.html?vesion='+version,
	                resolve:load(tpl + 'common/dict/controller/list.js')
	            })
            
	            //房源管理 - 层级设置
                .state('app.crm_schema', {
                    url: '/crm_schema',
                    templateUrl: tpl + 'room/schema/list.html?vesion='+version,
                    resolve:load(tpl + 'room/schema/controller/list.js')
                })
                //房源管理--层级管理
                .state('app.crm_schema_obj',{
                    url: '/crm_schema_obj',
                    templateUrl: tpl + 'room/schemaobj/list.html?vesion='+version,
                    resolve:load(tpl + 'room/schemaobj/controller/list.js')
                })
                //房源管理--房间管理
                .state('app.crm_room',{
                    url: '/crm_room',
                    templateUrl: tpl + 'room/room/list.html?vesion='+version,
                    resolve:load([tpl + 'room/room/controller/list.js',
                    				tpl + 'utils/schemachoose/controller/schema_choose.js',])
                })
                .state('app.crm_order_demand',{
                    url: '/crm_order_demand',
                    templateUrl: tpl + 'order/order_demand_list.html?vesion='+version,
                    resolve:load(tpl + 'order/controller/order_demand_list.js')
                })
                
                .state('app.crm_order',{
                    url: '/crm_order',
                    templateUrl: tpl + 'order/order_list.html?vesion='+version,
                    resolve:load(tpl + 'order/controller/order_list.js')
                })

                //客户管理--客户管理
                .state('app.t_customer',{
                    url: '/t_customer',
                    templateUrl: tpl + 'customer/customer/list.html?vesion='+version,
                    resolve:load([tpl + 'customer/customer/controller/list.js',
                                  tpl + 'customer/customer/utils/controller/contactChooseService.js?vesion=' + version,
                                  ])
                })
                //客户管理--联系人
                .state('app.t_contact',{
                    url: '/t_contact/:id',
                    templateUrl: tpl + 'customer/customer/contact.html?vesion='+version,
                    resolve:load(tpl + 'customer/customer/controller/contact.js')
                })
                //客户管理--客户跟踪
                .state('app.t_tail',{
                    url: '/t_tail/:id',
                    templateUrl: tpl + 'customer/customer/tail.html?vesion='+version,
                    resolve:load(tpl + 'customer/customer/controller/tail.js')
                })
                //客户管理--公司信息
                .state('app.t_company',{
                    url: '/t_company/:id',
                    templateUrl: tpl + 'customer/customer/company_list.html?vesion='+version,
                    resolve:load(tpl + 'customer/customer/controller/company.js')
                }) 
                 //用户统计
                .state('app.user_statis',{
                    url: '/user_statis',
                    templateUrl: tpl + 'statistics/user_statis.html?vesion='+version,
                    resolve:load([tpl + 'statistics/controller/user_statis.js',
                                  'common/thrid/echarts/echarts.min.js?vesion=' + version,
                                  ])
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