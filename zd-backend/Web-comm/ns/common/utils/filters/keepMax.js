/**
 * Created by longHuang on 2016/8/18.
 */
(function () {
    'use strict'

    app.filter('keepMax',function () {
        return function (value,number) {
            return value && value.length > number ? value.substring(0,number)+'...' : value;
        }
    })
})()