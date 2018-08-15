/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            // 本地
            var tpl = '/Web-comm/nsAdmin/';
			
            // 环境
            //var tpl = '/nsAdmin/';
			
			
            var version = new Date().getTime();

            $stateProvider
            //公务用车
            .state('app.car_manage', {
                url: '/car_manage',
                templateUrl: tpl + 'officialcars/car/list.html?vesion=' + version,
                resolve: load(tpl + 'officialcars/car/controller/list.js?vesion=' + version)
            })
            // 司机管理
            .state('app.driver_manage', {
                url: '/driver_manage',
                templateUrl: tpl + 'officialcars/driver/list.html?vesion=' + version,
                resolve: load([tpl + 'officialcars/driver/controller/list.js',
                                tpl + 'officialcars/driver/controller/userChooseService.js'])
            })

            // 领导管理
            .state('app.leader_manage', {
                url: '/leader_manage',
                templateUrl: tpl + 'officialcars/leader/list.html?vesion=' + version,
                resolve: load([tpl + 'officialcars/leader/controller/list.js',
                                tpl + 'officialcars/driver/controller/userChooseService.js'])
            })
            // 职务管理
            .state('app.duty_manage', {
                url: '/duty_manage',
                templateUrl: tpl + 'officialcars/duty/list.html?vesion=' + version,
                resolve: load(tpl + 'officialcars/duty/controller/list.js')
            })
            // 菜单管理
            .state('app.canteen_manage', {
                url: '/canteen_manage',
                templateUrl: tpl + 'restaurantbooking/manage/list.html?vesion=' + version,
                resolve: load([tpl + 'restaurantbooking/manage/controller/list.js',
                    tpl + 'restaurantbooking/manage/controller/foodChooseService.js'])
            })
			 // 套餐管理
            .state('app.canteen_category', {
                url: '/canteen_category',
                templateUrl: tpl + 'restaurantbooking/category/list.html?vesion=' + version,
                resolve: load([tpl + 'restaurantbooking/category/controller/list.js',
                    tpl + 'restaurantbooking/category/controller/foodChooseService.js'])
            })
			 // 外卖管理
            .state('app.canteen_takeout', {
                url: '/canteen_takeout',
                templateUrl: tpl + 'restaurantbooking/takeout/list.html?vesion=' + version,
                resolve: load([tpl + 'restaurantbooking/takeout/controller/list.js',
                    tpl + 'restaurantbooking/takeout/controller/foodChooseService.js'])
            })
            // 餐饮订单列表
            .state('app.canteen_order', {
                url: '/canteen_order',
                templateUrl: tpl + 'restaurantbooking/orderlist/list.html?vesion=' + version,
                resolve: load(tpl + 'restaurantbooking/orderlist/controller/list.js')
            })
            // 全部报事单
            .state('app.totalorder_manage', {
                url: '/totalorder_manage',
                templateUrl: tpl + 'repairs/totalorder/quote_all_list.html?vesion=' + version,
                resolve: load([tpl + 'repairs/totalorder/controller/quoteAlllist.js',
                                tpl+'repairs/totalorder/controller/popover.js'])
            })
            // 我的报事单
            .state('app.my_orderManage', {
                url: '/my_orderManage',
                templateUrl: tpl + 'repairs/myrepairorder/distribute_quote_list.html?vesion=' + version,
                resolve: load([tpl + 'repairs/myrepairorder/controller/distributeQuotelist.js',
                                tpl+'repairs/totalorder/controller/popover.js'])
            })
            // 区域管理
            .state('app.repairsarea_manage', {
                url: '/repairsarea_manage?serviceId',
                templateUrl: tpl + 'repairs/area/am_area_list.html?vesion=' + version,
                resolve: load(tpl + 'repairs/area/controller/amAreaList.js')
            })
            // 报事类型管理
            .state('app.type_manage', {
                url: '/type_manage',
                templateUrl: tpl + 'repairs/type/pn_sort_chief_list.html?vesion=' + version,
                resolve: load([tpl + 'repairs/type/controller/pnSortChiefList.js',
                                tpl+'repairs/type/controller/subStringFilter.js'])
            })
            //新增报事类型
            .state('app.type_manage_new', {
                url: '/type_manage_new?chiefId',
                templateUrl: tpl+'repairs/type/pn_sort_chief_new.html?vesion=' + version,
                resolve: load([tpl+'repairs/type/controller/pnSortChiefNew.js',
                               tpl+'repairs/type/controller/pnSortSubList.js',
                               tpl+'repairs/type/controller/pnSortflowList.js',
                               tpl+'repairs/type/controller/pnSortPeopleList.js',
                               tpl+'repairs/type/controller/selectCustomerDialogCtrl.js',
                               tpl+'repairs/type/controller/userChooseService.js',
                               tpl+'repairs/type/controller/userChoose.js',
                               tpl+'repairs/type/controller/subStringFilter.js'])
            })
            // 新建报事单
            .state('app.repairs_add_new', {
                url: '/repairs_add_new',
                templateUrl: tpl + 'repairs/addnew/quote_add.html?vesion=' + version,
                resolve: load(tpl + 'repairs/addnew/controller/quoteAdd.js')
            })

            // 报事单详情
            .state('app.repairs_detail', {
                url: '/repairs_detail?id&type&v&tab',
                templateUrl: tpl + 'repairs/repairsdetail/quote_details.html?vesion=' + version,
                resolve: load(tpl + 'repairs/repairsdetail/controller/quoteDetails.js')
            })
            // 放行订单管理
            .state('app.release_ordermanage', {
                url: '/release_ordermanage',
                templateUrl: tpl + 'releasegoods/ordermanage/list.html?vesion=' + version,
                resolve: load(tpl + 'releasegoods/ordermanage/controller/list.js')
            })
            // 放行类型管理
            .state('app.release_typemanage', {
                url: '/release_typemanage',
                templateUrl: tpl + 'releasegoods/type/list.html?vesion=' + version,
                resolve: load(tpl + 'releasegoods/type/controller/list.js')
            })
            // 放行类型管理
            .state('app.release_blacklist', {
                url: '/release_blacklist',
                templateUrl: tpl + 'releasegoods/blacklist/list.html?vesion=' + version,
                resolve: load([tpl + 'releasegoods/blacklist/controller/list.js',
                               tpl + 'releasegoods/blacklist/controller/company_choose.js',
                               tpl + 'releasegoods/blacklist/controller/userChooseService.js'])
            }) // 工卡管理管理
            .state('app.wordcard_ordermanage', {
                url: '/wordcard_ordermanage',
                templateUrl: tpl + 'onecard/wordcard/list.html?vesion=' + version,
                resolve: load(tpl + 'onecard/wordcard/controller/list.js')
            })
            // 场地管理
            .state('app.meeting_manage', {
                url: '/meeting_manage',
                templateUrl: tpl + 'meetingroom/roommanage/list.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roommanage/controller/list.js')
            })
            // 场地编辑
            .state('app.meeting_manage_edit', {
                url: '/meeting_manage_edit?id',
                templateUrl: tpl + 'meetingroom/roommanage/room_edit.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roommanage/controller/list.js')
            })
            // 新增场地
            .state('app.meeting_manage_add', {
                url: '/meeting_manage_add',
                templateUrl: tpl + 'meetingroom/roommanage/room_add.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roommanage/controller/list.js')
            })
            // 场地审核管理
            .state('app.meeting_manage_audit', {
                url: '/meeting_manage_audit',
                templateUrl: tpl + 'meetingroom/roommanage/room_audit.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roommanage/controller/list.js')
            })
            // 场地物品管理
            .state('app.meeting_manage_things', {
                url: '/meeting_manage_things',
                templateUrl: tpl + 'meetingroom/roommanage/room_things.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roommanage/controller/list.js')
            })
            // 场地订单
            .state('app.meeting_order', {
                url: '/meeting_order',
                templateUrl: tpl + 'meetingroom/roomorder/list.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/roomorder/controller/list.js')
            })
            // 物品管理
            .state('app.things_manage', {
                url: '/things_manage',
                templateUrl: tpl + 'meetingroom/things/list.html?vesion=' + version,
                resolve: load(tpl + 'meetingroom/things/controller/list.js')
            })

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