'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams','$templateCache',
      function ($rootScope,   $state,  $stateParams, $templateCache) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.$on('$routeChangeStart', function(event, next, current) {
              if (typeof(current) !== 'undefined'){
                  $templateCache.remove(current.templateUrl);
              }
          });
      }
    ]
  )
	.run(['$rootScope','$anchorScroll',function ($rootScope,$anchorScroll) {
		$rootScope.$on('$stateChangeStart',function () {
			$anchorScroll();
		})
	}])
    .config( ['$stateProvider','$urlRouterProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider,  $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {

          var src = 'common/thrid/src/';
          var layout = src+'tpl/app.html';

          $urlRouterProvider.otherwise('/app/main');
          $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: layout
                })
                .state('app.main', {
                    url: '/main',
                    templateUrl: src+'tpl/app_index.html',
                    resolve:{
                        deps:['uiLoad',function (uiLoad) {
                            uiLoad.load([src+'js/controllers/chart.js']);
                        }]
                    }
                });          
	              function load(srcs, callback) {
					return {
						deps: ['$ocLazyLoad', '$q',
							function( $ocLazyLoad, $q ){
								var deferred = $q.defer();
								var promise  = false;
								srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
								if(!promise){
									promise = deferred.promise;
								}
								angular.forEach(srcs, function(src) {
									promise = promise.then( function(){
										if(JQ_CONFIG[src]){
											return $ocLazyLoad.load(JQ_CONFIG[src]);
										}
										angular.forEach(MODULE_CONFIG, function(module) {
											if( module.name == src){
												name = module.name;
											}else{
												name = src;
											}
										});
										return $ocLazyLoad.load(name);
									} );
								});
								deferred.resolve();
								return callback ? promise.then(function(){ return callback(); }) : promise;
							}]
					}
				}
      }
    ]
  )
  
  .filter('statusToCh', function() {  
	  return function(input) { 
		  var result = "关闭";
		  if(input=='1'){
			  result = "开启";
		  }
		  return result;
	  };  
  })
  .filter('valuesToCh', function() {  
	  return function(input) { 
		  var result = "";
		  if(input=='PROJECT'){
			  result = "项目";
		  }else if(input=='MODULE'){
			  result = "模块";
		  }else if(input=='OTHERS'){
			  result = "其他";
		  }
		  return result;
	  };  
  })
  ;
