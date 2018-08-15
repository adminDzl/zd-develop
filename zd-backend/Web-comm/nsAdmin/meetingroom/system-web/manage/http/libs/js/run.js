/**
 * Created by tanqiang on 2016/8/19.
 */
(function () {
    'use strict'
    
    app.run(function (uiLoad,$location) {
        if($location.search().hide){
            uiLoad.load(['css/hide_other.css']);
        }
    })
})()