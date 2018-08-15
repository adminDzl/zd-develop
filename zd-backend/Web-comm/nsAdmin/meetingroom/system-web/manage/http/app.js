
import angular  from 'angular';
import uibootstrap from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';
import './libs/css/index.css';
import './libs/css/app.css';
import scss from'./libs/scss/index.scss';

import  'bootstrap';
import  './libs/assets/simple-line-icons/css/simple-line-icons.css' ;
import  './libs/assets/font-awesome/css/font-awesome.min.css';
import show from './libs/css/show.css';
import services  from './services';
import manageConf from './config/manage.conf';
import directives from'./directives';
import filters from './filter';
 
import controllers from'./controllers';
import views from'./views';
  
export default angular.module('wabgApp', [uirouter,uibootstrap, services.name, views.default, directives.name,filters.name, controllers.name])

.config(manageConf  )
    .run(['$state','$stateParams','$rootScope','$location',function($state, $stateParams, $rootScope,$location){
    	//获取新架构的access_token，保存到localStorage中
		var access_token = $location.search().access_token;
	    if(access_token){
	    	localStorage.token=access_token;
	    }
    
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;       
        $rootScope.$on('$stateChangeSuccess', function(event,toState) {
            $rootScope.nav = toState.nav;           
            $rootScope.nav1 = toState.nav1;
            $rootScope.act = toState.act;
          
            $rootScope.title = toState.title;
        });
       
        
    }]).name    
