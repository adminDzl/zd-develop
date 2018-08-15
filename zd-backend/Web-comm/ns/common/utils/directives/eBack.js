/**
 * Created by longHuang on 2016/9/26.
 */
(function () {
    'use strict'
    
    app.directive('eBack',function () {
        return {
            restrict:"A",
            link:function (scope,element) {
                element.click(function (e) {
                    window.history.back();
                    return false;
                })
            }
        }
    })
})()