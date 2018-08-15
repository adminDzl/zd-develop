/**
 * Created by longHuang on 2016/8/19.
 */
(function () {
    'use strict'
    
    app.run(function (uiLoad,$location) {
    	//console.log($location);
        if($location.search().hide){
            uiLoad.load(['common/thrid/src/css/hide_other.css']);
        }
    })
})()