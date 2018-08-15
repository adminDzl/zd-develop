/**
 * Created by longHuang on 2016/9/29.
 */
(function () {
    'use strict'
    
    app.factory('PowerCtrlCenter',function (HttpUtils) {
        return {
            getPower:getPower
        }
        
        function getPower(pageCode,callback) {
            var postaData = {
                funcCode:pageCode,
                parkId:1
            }
            HttpUtils.post('/permission/findPermissionCode.do',postaData,function (res) {
                var powers = {};
                angular.forEach(res.permissionCodeList,function (p) {
                    powers[p] = true;
                });
                callback(powers)
            })
        }
    })
})()