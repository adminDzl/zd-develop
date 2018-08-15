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
            },{
                name: '会议室',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [
                    {
                        name: '场地管理',
                        href: 'app/meeting_manage',
                        ui_sref: 'app.meeting_manage',
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