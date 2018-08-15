/**
 * luozhd 
 */
(function () {
    'use strict'
    
    app.directive('drop-select',function () {
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