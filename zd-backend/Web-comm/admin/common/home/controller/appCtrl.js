'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'HttpUtils',
    function(              $scope,   $translate,   $localStorage,   $window , HttpUtils ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      if(isIE){ angular.element($window.document.body).addClass('ie');}
      if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

      // 框架配置
      $scope.app = {
        name: 'CC+架构平台',
        version: '1.0.0',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // 主题设计--start
      if ( angular.isDefined($localStorage.settings) ) {
    	  $scope.app.settings = $localStorage.settings;
      } else {
    	  $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
    	  if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
    		  $scope.app.settings.headerFixed = true;
    	  }
    	  $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
    	  $localStorage.settings = $scope.app.settings;
      }, true);
      // 主题设计--end
      
      
      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
    	  $scope.selectLang = $scope.langs[langKey];
    	  $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
      
//      $scope.userInfo = function(){
//    	  var sendData = {};
//    	  HttpUtils.post("/web/user.do", sendData, function (data) {
//    		  $scope.user = data.data;
//          });
//      }
//      $scope.userInfo();
//      
//      $scope.userpower = function(){
//    	  var sendData = {};
//    	  HttpUtils.post("/user/pagePower.do", sendData, function (data) {
//    		  var list = data.data;
//    		  var keys = "";
//    		  angular.forEach(list, function(en) {
//    			  //页面元素
//    			  if(en && en.type == 2 && en.url){
//    				  keys += ","+en.url;
//    			  }
//    		  });
//    		  var power = {
//    		     keys:keys
//    		  };
//    		  $localStorage.pagePower = power;
//          });
//      }
//      $scope.userpower();
      $scope.checkUserPrivs = function(){
    	  var sendData = {};
    	  HttpUtils.get("/baseinfo/userinfo/privs", sendData, function (resp) {
    		  $localStorage.currPrivs = resp.data.privs;
          });
      }
      $scope.checkUserPrivs();

      $scope.form = {parkId:"",companyId:""};
      $scope.relatedParks = [];
      $scope.relatedCompanies = [];
      $scope.changePark = function(parkId){
    	  $scope.form.parkId = parkId;
    	  var sendData = {parkId:$scope.form.parkId,from:"PC"};
    	  HttpUtils.post("/baseinfo/userinfo/change", sendData, function (resp) {
				localStorage.token = resp.data.token;
		    	$window.location.reload();
          });
      }
      $scope.changeCompany = function(companyId){
    	  $scope.form.companyId = companyId;
    	  var sendData = {companyId:$scope.form.companyId,from:"PC"};
    	  HttpUtils.post("/baseinfo/userinfo/change", sendData, function (resp) {
				localStorage.token = resp.data.token;
		    	$window.location.reload();
          });
      }
      checkUser();
      function checkUser(){
    	  var sendData = {};
    	  HttpUtils.get("/baseinfo/userinfo/check", sendData, function (resp) {
				localStorage.currUser = JSON.stringify(resp.data.user);
				localStorage.currPark = JSON.stringify(resp.data.park);
				localStorage.currCompany = JSON.stringify(resp.data.company);
				
				$scope.park = resp.data.park;
				$scope.company = resp.data.company;
				
				if(resp.data.park!=null){
					$scope.form.parkId = resp.data.park.id;
					localStorage.currParkId = resp.data.park.id;
				}
				if(resp.data.company!=null){
					$scope.form.companyId = resp.data.company.id;
					localStorage.currCompanyId = resp.data.company.id;
				}
				$scope.form.realname = resp.data.user.realname;
				$scope.form.photoUrl = resp.data.user.photoUrl;
    	  });
      }
      checkUserRelated();
      function checkUserRelated(){
    	  var sendData = {};
    	  HttpUtils.get("/baseinfo/userinfo/related", sendData, function (resp) {
    		  $scope.relatedParks = resp.data.parks;
    		  $scope.relatedCompanies = resp.data.companies;
    	  });
      }
      
      $scope.logout = function(){
    	  var sendData = {token:localStorage.token};
    	  HttpUtils.post("/security/admin/loginout", sendData, function (data) {
    		  window.location.href='../admin/login.html';
          });
      }
      
      
      
 	     //请求后台数据
 	     function getFileManagerData(){
 	 		HttpUtils.get("/baseinfo/open/fileserver/getFileServerUrl", {} ,function (data) {
 	 			localStorage.fileServerUploadUrl = data.fileServerUploadUrl;
 	 			localStorage.fileServerViewUrl = data.fileServerViewUrl;
 	 		});
 	 		
 	 	 }  
 	     
 	     
 	    getFileManagerData();
 	     
      
      

//      $scope.logout = function(){
//    	  window.location.href='../admin/login.html';
//
//      }
  }]);
