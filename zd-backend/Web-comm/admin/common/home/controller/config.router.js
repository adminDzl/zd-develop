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

          var src = 'common/home/';

          $urlRouterProvider.otherwise('/app/main');
          $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: src+'app.html'
                })
                .state('app.main', {
                    url: '/main',
                    templateUrl: src+'app_index.html',
                    resolve:{
                        deps:['uiLoad',function (uiLoad) {
                            uiLoad.load([src+'controller/appindex.js']);
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
	.filter("statusStr2",function(){
    return function(status){
        if(status==0 || status==-1){
            return "冻结";
        }else if(status==1){
            return "开放";
        }
    }
})
     .filter("imgUrl",function(){
		return function(url){
			if(!url){
				return null;
			}
			if(url.indexOf("http") != -1){
				return url;
			}else{
				return Utils.fileServerViewUrl+url;
			}
		}
	})
    .filter("sexStr",function(){
        return function(sex){
            if(sex==0){
                return "女";
            }else if(sex==1){
                return "男";
            }
        }
    });

//提示操作是否成功
Utils.showTip = function(isSuccess,tip){
    if(isSuccess==true){
        $(".success-tip").text(tip);
        $(".fail-tip").text("");
    }else if(isSuccess==false){
        $(".success-tip").text("");
        $(".fail-tip").text(tip);
    }else{
        $(".success-tip,.fail-tip").text("");
    }
}

Utils.colResizable = function(angular,ele){
    if(!ele) ele = ".issueTable";
    setTimeout(function(){
        angular.element(ele).colResizable({
            liveDrag:true,
            gripInnerHtml:"<div class='grip'></div>",
            draggingClass:"dragging",
            resizeMode:'fit'
        });
    },1000);

};

//关闭窗口时清空之前存在的提示语
Utils.clearModal = function(){
    $('.modal').on('hidden.bs.modal', function () {
        if($(".fail-tip").length>0 || $(".success-tip").length>0){
            Utils.showTip();
        }
    })
};




angular.module('app').factory('Common', [
    '$http', '$q', function($http, $q) {
     return {
      loadScript: function(url, callback) {
       var head = document.getElementsByTagName("head")[0];
       var script = document.createElement("script");
       script.setAttribute("type", "text/javascript");
       script.setAttribute("src", url);
       script.setAttribute("async", true);
       script.setAttribute("defer", true);
       head.appendChild(script);
       //fuck ie! duck type
       if (document.all) {
        script.onreadystatechange = function() {
         var state = this.readyState;
         if (state === 'loaded' || state === 'complete') {
          callback && callback();
         }
        }
       }
       else {
        //firefox, chrome
        script.onload = function() {
         callback && callback();
        }
       }
      },
      loadCss: function(url) {
       var ele = document.createElement('link');
       ele.href = url;
       ele.rel = 'stylesheet';
       if (ele.onload == null) {
        ele.onload = function() {
        };
       }
       else {
        ele.onreadystatechange = function() {
        };
       }
       angular.element(document.querySelector('body')).prepend(ele);
      }
     }
    }
   ]);


angular.module('app').directive('ueditor', [
         'Common',
         '$rootScope',
         function(Common, $rootScope) {
          return {
           restrict: 'EA',
           require: 'ngModel',
           link: function(scope, ele, attrs, ctrl) {
            $rootScope.$emit('loading', '初始化编辑器...');//广播loading事件，可以删除
            var _self = this,
              _initContent,
              editor,
              editorReady = false,
              base = "common/thrid/ueditor",
              _id = attrs.ueditor;
            var editorHandler = {
             init: function() {
              window.UEDITOR_HOME_URL = base + '/';
              var _self = this;
              if (typeof UE != 'undefined') {
               editor = new UE.ui.Editor({
                      initialContent: _initContent,
                      toolbars: [
                               [
                                'fullscreen', 'source', '|', 'fontsize', '|',
                                'blockquote', 'horizontal', '|',
                                'removeformat', '|',
                                'simpleupload', '|', 
                                'bold', 'italic', 'underline', 'forecolor', 'backcolor', '|',
                                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                'insertorderedlist', 'insertunorderedlist', '|',
                                'link', 'unlink', '|'
                               ]
                      ],
                      initialFrameHeight:scope.height || 240,
                      initialFrameWidth:'100%',
                      autoHeightEnabled:false,
                      wordCount:false,
                      elementPathEnabled: false,
                      zIndex:1100,
                      //初始化富文本字体大小
                      fontsize:[10, 11, 12, 14, 16, 18, 20, 24]
                  });
               //给ueditor对象设置一个id
               editor.render(_id);
               editor.ready(function() {
                editorReady = true; 
                $rootScope.$emit('loading', '');//编辑器初始化完
                editor.addListener('contentChange', function() {//双向绑定
                 if (!scope.$$phase) {
                  scope.$apply(function() {
                   ctrl.$setViewValue(editor.getContent());
                  });
                 }
                });
               });
              }
              else {
               Common.loadScript(base + '/ueditor.config.js', null);
               Common.loadScript(base + '/ueditor.all.js', function() {
                _self.init();
               });
              }
             },
             setContent: function(content) {
              if (editor && editorReady) {
               editor.setContent(content);
              }
             }
            };
            ctrl.$render = function() {
             _initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
             editorHandler.setContent(_initContent);//双向绑定
            };
            editorHandler.init();
            //事件
            $rootScope.$on('$routeChangeStart', function() {
             editor && editor.destroy();
            });
           }
          }
         }
        ]);

