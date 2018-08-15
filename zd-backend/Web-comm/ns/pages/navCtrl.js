/**
 * Created by longHuang on 2016/8/3.
 */
(function () {
    'use strict'

    app.controller('navCtrl', function ($scope, $element, $state,$localStorage) {
        var navTree = [{
            name: 'CC+架构平台',
            list: [{
                name: '系统平台管理',
                icon: 'glyphicon glyphicon-tasks icon',
                privilege: 'system:manage',
                list: [{
                    name: '用户管理',
                    href: 'app/user',
                    ui_sref: 'app.user',
                    privilege: 'user:list'
                },
                {
                    name: '园区管理',
                    href: 'app/park',
                    ui_sref: 'app.park',
                },
                {
                    name: '公司管理',
                    href: 'app/organization',
                    ui_sref: 'app.organization',
                    privilege: 'company:list'
                },
               /* {
                	name: '部门管理',
                	href: 'app/department',
                	ui_sref: 'app.department',
                	privilege: 'dept:list'
                },*/
                {
                	name: '商家管理',
                	href: 'app/store',
                	ui_sref: 'app.store',
                },
                {
                    name: '菜单管理',
                    href: 'app/resource',
                    ui_sref: 'app.resource'
                },
                {
                    name: '接口管理',
                    href: 'app/api',
                    ui_sref: 'app.api',
                },
                {
                    name: '逻辑树管理',
                    href: 'app/treemanage',
                    ui_sref: 'app.treemanage'
                },
                {
                    name: 'Excel表头管理',
                    href: 'app/excelhead',
                    ui_sref: 'app.excelhead'
                },
                {
                    name: '数据字典',
                    href: 'app/c_code',
                    ui_sref: 'app.c_code',
                }]
            },
            {
                name: '系统管理',
                icon: 'glyphicon glyphicon-tasks icon',
                privilege: 'system:manage',
                list: [
                {
                        name: '园区信息管理',
                        href: 'app/parkmanage',
                        ui_sref: 'app.parkmanage'
                },
                {
                    name: '园区用户管理',
                    href: 'app/parkUser',
                    ui_sref: 'app.parkUser',
                },
                {
                    name: '园区企业管理',
                    href: 'app/parkCompany',
                    ui_sref: 'app.parkCompany',
                },
                {
                	name: '企业部门管理',
                	href: 'app/orgDept',
                	ui_sref: 'app.orgDept',
                },
                {
                    name: '园区角色管理',
                    href: 'app/parkrole',
                    ui_sref: 'app.parkrole'
                },
                /*{
                    name: '平台角色管理',
                    href: 'app/role',
                    ui_sref: 'app.role',
                },*/
                {
                    name: '服务管理',
                    href: 'app/parkservice',
                    ui_sref: 'app.parkservice'
                },
                {
                    name: '个人中心',
                    href: 'app/usermanage',
                    ui_sref: 'app.usermanage'
                },
                {
                	name: '企业用户管理',
                	href: 'app/companyUser',
                	ui_sref: 'app.companyUser',
                },
                /*{
                    name: '园区权限管理(平台)',
                    href: 'app/parkresourceadmin',
                    ui_sref: 'app.parkresourceadmin',
                    privilege: 'auparkadm:list'
                },*/
                {
                    name: '下级园区管理',
                    href: 'app/childpark',
                    ui_sref: 'app.childpark',
                    privilege: 'childpark:list'
                },
                {
                    name: '下级园区权限管理',
                    href: 'app/parkresource',
                    ui_sref: 'app.parkresource',
                    privilege: 'aupark:list'
                }]
            },{
            	name: 'CC+平台管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
            	{
                	name: '热点信息类型',
                	href: 'app/infoCategory',
                	ui_sref: 'app.infoCategory'
                },
                {
                	name: '热点信息管理',
                	href: 'app/ccInformation',
                	ui_sref: 'app.ccInformation'
                },
                {
                	name: '订单管理',
                	href: 'app/ccOrder',
                	ui_sref: 'app.ccOrder'
                },
                {
                	name: '页面服务配置',
                	href: 'app/serviceConfigPc',
                	ui_sref: 'app.serviceConfigPc'
                },
                /*{
                	name: 'APP服务配置',
                	href: 'app/serviceConfigApp',
                	ui_sref: 'app.serviceConfigApp',
                },*/
                {
                	name: '社交管理',
                	href: 'app/ccSocial',
                	ui_sref: 'app.ccSocial'
                },
                {
                	name: 'banner管理',
                	href: 'app/ccBanner',
                	ui_sref: 'app.ccBanner'
                }
                ]
            },{
                name: '推送管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '推送',
                        href: 'app/app_push',
                        ui_sref: 'app.app_push'
                    },
                    {
                        name: '短信',
                        href: 'app/sms_push',
                        ui_sref: 'app.sms_push'
                    },
                    {
                        name: '邮件',
                        href: 'app/email_push',
                        ui_sref: 'app.email_push'
                    },
                    {
                        name: '分类',
                        href: 'app/classified_message',
                        ui_sref: 'app.classified_message'
                    },
                    {
                        name: '用户',
                        href: 'app/push_user',
                        ui_sref: 'app.push_user'
                    }
                ]
            },{
            	name: '数据统计',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                {
                	name: '数据图表管理',
                	href: 'app/table_info',
                	ui_sref: 'app.table_info',
                },
                {
                	name: '数据分析',
                	href: 'app/analysis',
                	ui_sref: 'app.analysis',
                }
                ]
            }]
        },
        {
            name: '客户关系管理系统',
            list: [{
                name: '房源管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '层级设置',
                        href: 'app/crm_schema',
                        ui_sref: 'app.crm_schema',
                    },
                    {
                        name: '层级管理',
                        href: 'app/crm_schema_obj',
                        ui_sref: 'app.crm_schema_obj',
                    },
                    {
                        name: '房间管理',
                        href: 'app/crm_room',
                        ui_sref: 'app.crm_room'
                    }
                ]
            },
            {
                name: '订单管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '意向单',
                        href: 'app/crm_order_demand',
                        ui_sref: 'app.crm_order_demand'
                    },{
                        name: '订单管理',
                        href: 'app/crm_order',
                        ui_sref: 'app.crm_order'
                    }
                ]
            },{
                name: '客户管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '客户管理',
                        href: 'app/t_customer',
                        ui_sref: 'app.t_customer',
                    }/*,
                    {
                        name: '联系人管理',
                        href: 'app/t_contact',
                        ui_sref: 'app.t_contact',
                    },
                    {
                        name: '客户跟踪管理',
                        href: 'app/t_tail',
                        ui_sref: 'app.t_tail'
                    }*/
                ]
            },{
                name: '报表统计管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '用户统计',
                        href: 'app/user_statis',
                        ui_sref: 'app.user_statis',
                    }
                ]
            },{
                name: '应用设置',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '数据字典',
                        href: 'app/crm_dict',
                        ui_sref: 'app.crm_dict',
                    }
                ]
            }]
        },
        {
            name: '平台辅助功能',
            list: [{
                name: '日志管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                {
                    name: '操作日志',
                    href: 'app/t_log_action',
                    ui_sref: 'app.t_log_action',
                },/*{
                    name: '日志记录设置',
                    href: 'app/t_log_rule',
                    ui_sref: 'app.t_log_rule',
                }*/]
            },{
            	name: '部署管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                {
                	name: '应用管理',
                	href: 'app/depApps',
                	ui_sref: 'app.depApps',
                },
                {
                	name: '部署订单管理',
                	href: 'app/depOrder',
                	ui_sref: 'app.depOrder',
                },
                {
                	name: '应用运行状态',
                	href: 'app/depRunApps',
                	ui_sref: 'app.depRunApps',
                },
                {
                	name: '应用接口查询',
                	href: 'app/apiinfo',
                	ui_sref: 'app.apiinfo',
                }	
                ]
            },{
            	name: '数据同步管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                
                {
                	name: '业务任务管理',
                	href: 'app/syncOpList',
                	ui_sref: 'app.syncOpList',
                },
                {
                	name: '定时任务管理',
                	href: 'app/syncOpJob',
                	ui_sref: 'app.syncOpJob',
                }
                ]
            },{
            	name: '第三方应用',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
/*                {
                	name: '用户管理',
                	href: 'app/tp_user',
                	ui_sref: 'app.tp_user',
                },*/
                {
                	name: '第三方应用管理',
                	href: 'app/client',
                	ui_sref: 'app.client',
                }
                ]
            }]
        },
        {
            name: '南山智慧后勤后台管理系统',
            list: [{
                name: '公务用车',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '订单管理',
                        href: 'app/car_manage',
                        ui_sref: 'app.car_manage',
                    },
                    {
                        name: '司机管理',
                        href: 'app/driver_manage',
                        ui_sref: 'app.driver_manage',
                    },
                    {
                        name: '领导管理',
                        href: 'app/leader_manage',
                        ui_sref: 'app.leader_manage',
                    },
                    {
                        name: '职务管理',
                        href: 'app/duty_manage',
                        ui_sref: 'app.duty_manage',
                    },
                    {
                        name: '用车统计',
                        href: 'app/car_count',
                        ui_sref: 'app.car_count',
                    }
                ]
            },{
                name: '餐饮预订',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '餐饮管理',
                        href: 'app/canteen_manage',
                        ui_sref: 'app.canteen_manage',
                    },
                    {
                        name: '套餐管理',
                        href: 'app/canteen_category',
                        ui_sref: 'app.canteen_category',
                    },
                    {
                        name: '外卖管理',
                        href: 'app/canteen_takeout',
                        ui_sref: 'app.canteen_takeout',
                    },    
                    {
                        name: '订单列表',
                            href: 'app/canteen_order',
                        ui_sref: 'app.canteen_order',
                    }
                ]
            },
	   {
                name: '掌上报修',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '全部报事单',
                        href: 'app/totalorder_manage',
                        ui_sref: 'app.totalorder_manage',
                    },
                    {
                        name: '报事类型',
                        href: 'app/type_manage',
                        ui_sref: 'app.type_manage',
                    },
                    {
                        name: '区域管理',
                        href: 'app/repairsarea_manage',
                        ui_sref: 'app.repairsarea_manage',
                    }
                ]
            },{
                name: '物品放行',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '放行订单管理',
                        href: 'app/release_ordermanage',
                        ui_sref: 'app.release_ordermanage',
                    },
                    {
                        name: '放行类型管理',
                        href: 'app/release_typemanage',
                        ui_sref: 'app.release_typemanage',
                    }
                ] 
            }
            ]
        }
];

        loadNav(navTree, $element);


        function loadNav(allTree, e) {
            angular.forEach(allTree, function (tree, i, all) {
            	if(tree.privilege!=null){
            		var required = tree.privilege;
                	var hasPower = false;
                    var currPrivs = $localStorage.currPrivs;
                    if(currPrivs){
                    	for(var x in currPrivs){
                    		var p = currPrivs[x];
                    		if(p==required){
                    			hasPower = true;
                    			break;
                    		}
                    	}
                    }
                    if(!hasPower){
                    	return;
                    }
            	}
                if (tree.list) {
                    if (tree.icon) {
                        e.append('<li>' +
                            '<a href class="auto">' +
                            '<span class="pull-right text-muted">' +
                            '<i class="fa fa-fw fa-angle-right text"><\/i>' +
                            '<i class="fa fa-fw fa-angle-down text-active"><\/i>' +
                            '<\/span>' +
                            '<i class="' + tree.icon + '"><\/i>' +
                            '<span class="font-bold" >' + tree.name + '</span>' +
                            '<\/a>' +
                            '<ul class="nav nav-sub dk"><\/ul>' +
                            '<\/li>');
                        if (i === all.length - 1)appendLine();
                        loadNav(tree.list, e.children('li').children('ul').last());
                    } else if (all === navTree) {
                        e.append('<li class="hidden-folded padder m-t m-b-sm text-muted text-xs">' +
                            '<span >' + tree.name + '<\/span>' +
                            '<\/li> ');
                        loadNav(tree.list, e)
                    } else {
                        e.append('<li>' +
                            '<a href class="auto">' +
                            '<span class="pull-right text-muted">' +
                            '<i class="fa fa-fw fa-angle-right text"><\/i>' +
                            '<i class="fa fa-fw fa-angle-down text-active"><\/i>' +
                            '<\/span>' +
                            '<span class="font-bold" >' + tree.name + '</span>' +
                            '<\/a>' +
                            '<ul class="nav nav-sub dk"><\/ul>' +
                            '<\/li>');
                        loadNav(tree.list, e.children('li').children('ul').last());
                    }
                } else {
                    e.append('<li ui-sref-active="active">' +
                        '<a href="#/' + tree.href + '" ui-sref="' + tree.ui_sref + '">' +
                        '<span>' + tree.name + '<\/span>' +
                        '<\/a>' +
                        '<\/li>');
                }
            })
        }

        function appendLine() {
            $element.append('<li class="line dk"></li>')
        }
    })
})()