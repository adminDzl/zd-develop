/**
 * Created by longHuang on 2016/7/4.
 */
(function () {
    'use strict'
    
    angular.module('app')
        .value('modalCode',{
            default:0,
            success:1,
            info:2,
            warning:3,
            danger:4
        })
        .factory('ModalCtrl',['$modal',function ($modal) {
            var out = undefined;

            return{
                show:show
            }
            
            function show(title,data,success,callback,addInfo,icon,showTime) {
                var site = {
                    addInfo:addInfo,
                    title:title,
                    data:data,
                    success:success,
                    callback:callback,
                    icon:icon,
                    showTime:showTime
                }
                $modal.open({
                    templateUrl:'common/utils/toolsViews/modal_notice.html?version='+new Date().getTime(),
                    controller:'modalController',
                    controllerAs:'mm',
                    backdrop:'false',
                    resolve:{
                        site:function () {
                            return site;
                        }
                    }
                })
            }
        }])
        .controller('modalController',function (site,$modalInstance,$timeout) {
            console.log(site);
            var mm = this;
            mm.site = site;
            var showTemp = false;

            if(!mm.site.callback) {
                showTemp = false;
                $timeout(function () {
                    $modalInstance.close();
                }, site.showTime?site.showTime:2000)
            }else{
                showTemp = true;
            }

            mm.show = function () {
                return showTemp;
            }

            mm.close = function () {
                $modalInstance.close();
            }

            mm.ok = function () {
                $modalInstance.close();
                mm.site.callback();
            }

            mm.choose = function () {
                return mm.site.success;
            }
        })
})();