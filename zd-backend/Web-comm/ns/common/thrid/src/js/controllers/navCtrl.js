/**
 * Created by longHuang on 2016/8/3.
 */
(function () {
    'use strict'

    app.controller('navCtrl', function ($scope, $element, $state) {
        var navTree = [{
            name: '智慧马峦',
            list: [{
                name: '企业管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [{
                    name: '企业列表',
                    href: 'app/t_company_list',
                    ui_sref: 'app.t_company_list',
                },{
                    name: '企业类型',
                    href: 'app/t_company_type_list',
                    ui_sref: 'app.t_company_type_list',
                }]
            },{
                name: '安检管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [{
                    name: '安检类型',
                    href: 'app/t_check_problem_list',
                    ui_sref: 'app.t_check_problem_list',
                },{
                    name: '安检列表',
                    href: 'app/t_check_list',
                    ui_sref: 'app.t_check_list',
                },{
                    name: '待审核列表',
                    href: 'app/t_check_examine_list',
                    ui_sref: 'app.t_check_examine_list',
                }]
            },{
                name: '系统管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [{
                    name: '用户管理',
                    href: 'app/t_user',
                    ui_sref: 'app.t_user',
                },
                {
                    name: '角色管理',
                    href: 'app/t_role',
                    ui_sref: 'app.t_role',
                },{
                    name: '权限字典',
                    href: 'app/t_resource',
                    ui_sref: 'app.t_resource',
                },{
                    name: '数据字典',
                    href: 'app/c_code',
                    ui_sref: 'app.c_code',
                }]
            },{
                name: '日志管理',
                icon: 'glyphicon glyphicon-tasks icon',
                list: [{
                    name: '登录日志',
                    href: 'app/t_log_login',
                    ui_sref: 'app.t_log_login',
                },
                {
                    name: '操作日志',
                    href: 'app/t_log_action',
                    ui_sref: 'app.t_log_action',
                },{
                    name: '日志记录设置',
                    href: 'app/t_log_rule',
                    ui_sref: 'app.t_log_rule',
                }]
            }]
        }];

        loadNav(navTree, $element);


        function loadNav(allTree, e) {
            angular.forEach(allTree, function (tree, i, all) {
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