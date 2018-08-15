/**
 * Config for the router
 */
(function () {
    'use strict';
    app.config(
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {
            var tpl = 'pages/baseinfo/';
            var version = new Date().getTime();

            $stateProvider
            
            	//用户管理
                .state('app.user', {
                    url: '/user',
                    templateUrl: tpl + 'user/user_list.html?vesion=' + version,
                    resolve: load([tpl + 'user/controller/user_list.js?vesion=' + version,
                    			   tpl + 'user/utils/parkchoose/park_choose.js?vesion=' + version,
                    			   tpl + 'user/utils/deptchoose/dept_choose.js?vesion=' + version,
                                   tpl + 'user/utils/companychoose/company_choose.js?vesion=' + version])
                })
                //园区用户管理
                .state('app.parkUser', {
                	url: '/parkUser',
                	templateUrl: tpl + 'user/park_user_list.html?vesion=' + version,
                	resolve: load([tpl + 'user/controller/park_user_list.js?vesion=' + version,
                		tpl + 'user/utils/parkchoose/park_choose.js?vesion=' + version,
                		tpl + 'user/utils/parkchoose/park_choose.js?vesion=' + version,
                		tpl + 'user/utils/companychoose/company_choose.js?vesion=' + version])
                })
                
                //园区企业管理
                .state('app.parkCompany', {
                    url: '/parkCompany',
                    templateUrl: tpl + 'company/parkOrganization.html?vesion=' + version,
                    resolve: load([tpl + 'company/controller/parkOrganization.js?vesion=' + version,
                    	tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version,
                    			   tpl + 'utils/companychoose/controller/company_choose.js?vesion=' + version
                    			   ])
                })
                //企业部门管理
                .state('app.orgDept', {
                	url: '/orgDept',
                	templateUrl: tpl + 'dept/orgDepartment.html?vesion=' + version,
                	resolve: load([tpl + 'dept/controller/orgDepartment.js?vesion=' + version,
                		tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version,
                		tpl + 'utils/companychoose/controller/company_choose.js?vesion=' + version
                		])
                })
                
                
                //企业用户管理
                .state('app.companyUser', {
                	url: '/companyUser',
                	templateUrl: tpl + 'user/company_user_list.html?vesion=' + version,
                	resolve: load([tpl + 'user/controller/company_user_list.js?vesion=' + version,
                		tpl + 'user/utils/parkchoose/park_choose.js?vesion=' + version,
                		tpl + 'user/utils/companychoose/company_choose.js?vesion=' + version])
                })
                
                //企业管理
                .state('app.organization', {
                    url: '/organization',
                    templateUrl: tpl + 'company/organization.html?vesion=' + version,
                    resolve: load([tpl + 'company/controller/organization.js?vesion=' + version,
                    			   tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version,
                    			   tpl + 'utils/companychoose/controller/company_choose.js?vesion=' + version
                    			   ])
                })
                //部门管理
                .state('app.department', {
                	url: '/department',
                	templateUrl: tpl + 'dept/department.html?vesion=' + version,
                	resolve: load([tpl + 'dept/controller/department.js?vesion=' + version,
                		tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version,
                		tpl + 'utils/companychoose/controller/company_choose.js?vesion=' + version
                		])
                })
                //商家管理
                .state('app.store', {
                	url: '/store',
                	templateUrl: tpl + 'store/store.html?vesion=' + version,
                	resolve: load([tpl + 'store/controller/store.js?vesion=' + version,
                		tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version,
                		tpl + 'utils/companychoose/controller/company_choose.js?vesion=' + version
                		])
                })
                //平台公司成员列表
                .state('app.listPlatformOrgUsers', {
                    url: '/listPlatformOrgUsers?id',
                    templateUrl: tpl + 'company/platform_org_user_list.html?vesion=' + version,
                    resolve: load(tpl + 'company/controller/platform_org_user_list.js?vesion=' + version)
                })
                //公司成员列表
                .state('app.listOrgUsers', {
                	url: '/listOrgUsers?id',
                	templateUrl: tpl + 'company/org_user_list.html?vesion=' + version,
                	resolve: load(tpl + 'company/controller/org_user_list.js?vesion=' + version)
                })
                //部门用户管理
                .state('app.deptUser', {
                	url: '/deptUser?id',
                	templateUrl: tpl + 'dept/dept_user_list.html?vesion=' + version,
                	resolve: load([tpl + 'dept/controller/dept_user_list.js?vesion=' + version])
                })
                
                //园区管理
                .state('app.park', {
                    url: '/park',
                    templateUrl: tpl + 'park/park_list.html?vesion=' + version,
                    resolve: load([
         			   			  tpl + 'park/controller/park_list.js?vesion=' + version,
                    			   tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version])
                })
                //下级园区管理
                .state('app.childpark', {
                	url: '/childpark',
                	templateUrl: tpl + 'park/child_park_list.html?vesion=' + version,
                	resolve: load([tpl + 'park/controller/child_park_list.js?vesion=' + version,
                		tpl + 'utils/parkchoose/controller/park_choose.js?vesion=' + version])
                })
                //当前园区信息管理
                .state('app.parkmanage', {
                	url: '/parkmanage',
                	templateUrl: tpl + 'park/parkIntroduce.html?vesion=' + version,
                	resolve: load([tpl + 'park/css/park.css?vesion=' + version,tpl + 'park/controller/parkIntroduce.js?vesion=' + version,'common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
                //当前用户信息管理
                .state('app.usermanage', {
                	url: '/usermanage',
                	templateUrl: tpl + 'user/userIntroduce.html?vesion=' + version,
                	resolve: load([tpl + 'user/css/user.css?vesion=' + version,tpl + 'user/controller/userIntroduce.js?vesion=' + version,'common/thrid/libs/jquery/jquery.form.js','common/utils/fileserver/util.js'])
                })
                
                //园区公司和用户
                .state('app.parkmember', {
                    url: '/parkmember?id',
                    templateUrl: tpl + 'park/parkmember.html?vesion=' + version,
                    resolve: load(tpl + 'park/controller/parkmember.js?vesion=' + version)
                })
                
                //园区服务管理
                .state('app.parkservice', {
                    url: '/parkservice',
                    templateUrl: tpl + 'parkservice/list.html?vesion=' + version,
                    resolve: load(tpl + 'parkservice/controller/list.js')
                })
                
                //api资源
                .state('app.api', {
                    url: '/api',
                    templateUrl: tpl + 'api/apiinfo.html?vesion=' + version,
                    resolve: load(tpl + 'api/controller/apiinfo.js')
                })
                //逻辑树管理
                .state('app.treemanage', {
                	url: '/treemanage',
                	templateUrl: tpl + 'tree/treemanage.html?vesion=' + version,
                	resolve: load([tpl + 'tree/controller/treemanage.js',tpl + 'tree/controller/util/tree.js'])
                })
                
                //Excel表头管理
                .state('app.excelhead', {
                	url: '/excelhead',
                	templateUrl: tpl + 'excel/excel_list.html?vesion=' + version,
                	resolve: load([tpl + 'excel/controller/excel_list.js'])
                })
                
                //角色表
                .state('app.role', {
                    url: '/role',
                    templateUrl: tpl + 'role/role_list.html?vesion=' + version,
                    resolve: load([tpl + 'role/controller/role_list.js?vesion=' + version,
                    			   tpl + 'utils/resourcechoose/controller/t_resource_choose.js?vesion=' + version,
                    			   tpl + 'utils/userchoose/controller/userChooseService.js?vesion=' + version])
                })
                .state('app.parkresourceadmin', {
                    url: '/parkresourceadmin',
                    templateUrl: tpl + 'parkresourceadmin/list.html?vesion=' + version,
                    resolve: load([tpl + 'parkresourceadmin/controller/list.js?vesion=' + version,
                    			   tpl + 'utils/resourcechoose/controller/t_resource_choose.js?vesion=' + version,
                    			   tpl + 'utils/userchoose/controller/userChooseService.js?vesion=' + version])
                })
                .state('app.parkresource', {
                    url: '/parkresource',
                    templateUrl: tpl + 'parkresource/list.html?vesion=' + version,
                    resolve: load([tpl + 'parkresource/controller/list.js?vesion=' + version,
                    			   tpl + 'utils/resourcechoose/controller/t_resource_choose.js?vesion=' + version,
                    			   tpl + 'utils/userchoose/controller/userChooseService.js?vesion=' + version])
                })
                .state('app.parkrole', {
                    url: '/parkrole',
                    templateUrl: tpl + 'role/role_list.html?vesion=' + version,
                    resolve: load([tpl + 'role/controller/role_list.js?vesion=' + version,
                    			   tpl + 'utils/resourcechoose/controller/t_resource_choose.js?vesion=' + version,
                    			   tpl + 'utils/parkuserchoose/controller/userChooseService.js?vesion=' + version])
                })
                //菜单资源
                .state('app.resource', {
                    url: '/resource',
                    templateUrl: tpl + 'resource/list.html?vesion=' + version,
                    resolve: load([tpl + 'resource/controller/list.js?vesion=' + version])
                })
                
                //字典
                .state('app.c_code', {
                    url: '/c_code',
                    templateUrl: tpl + 'user/c_dict_list.html?vesion=' + version,
                    resolve: load(tpl + 'user/controller/c_dict_list.js')
                })
                
                //日志管理
                // .state('app.t_log_rule', {
                //     url: '/t_log_rule',
                //     templateUrl: tpl + 'log/t_logrule_list.html?vesion=' + version,
                //     resolve: load(tpl + 'log/controller/t_logrule_list.js')
                // })
                // .state('app.t_log_login', {
                //     url: '/t_log_login',
                //     templateUrl: tpl + 'log/t_login_list.html?vesion=' + version,
                //     resolve: load(tpl + 'log/controller/t_login_list.js')
                // })
                // .state('app.t_log_action', {
                //     url: '/t_log_action',
                //     templateUrl: tpl + 'log/t_log_list.html?vesion=' + version,
                //     resolve: load(tpl + 'log/controller/t_log_list.js')
                // })
                
                 
               
                .state('app.t_check_problem_list', {
                    url: '/t_check_problem_list',
                    templateUrl: tpl + 'check/t_check_problem_list.html?vesion=' + version,
                    resolve: load(tpl + 'check/controller/t_check_problem_list.js')
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