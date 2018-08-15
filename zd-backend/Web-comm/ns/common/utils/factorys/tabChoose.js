/**
 * Created by longHuang on 2016/10/10.
 */
(function () {
    'use strict'

    app.factory('TabChoose',function () {
        return {
            make:make
        }

        function make(k,v,callback) {
            if(window.sessionStorage){
                if(typeof(v) == 'number'){
                    window.sessionStorage.setItem(k,v);
                }else{
                    callback(window.sessionStorage.getItem(k) == undefined ? 0 : window.sessionStorage.getItem(k));
                }
            }
        }
    })
})()