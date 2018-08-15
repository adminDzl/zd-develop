/**
 * Created by longHuang on 2016/7/4.
 */
(function () {
    'use strict'

    angular.module("app")
        .config(
            function ($httpProvider) {

                // 0618添加，为的是解决$post发送请求到后台，参数传递不过去问题 - start
                $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
              //  $httpProvider.defaults.headers.postJson['Content-Type'] = 'application/json; charset=UTF-8';
                //$httpProvider.defaults.headers.common['Authorization'] = localStorage.token;

                // Override $http service's default transformRequest
                $httpProvider.defaults.transformRequest = [function (data) {
                    /**
                     * The workhorse; converts an object to x-www-form-urlencoded serialization.
                     * @param {Object} obj
                     * @return {String}
                     */
                    var param = function (obj) {
                        var query = '';
                        var name, value, fullSubName, subName, subValue, innerObj, i;

                        for (name in obj) {
                            value = obj[name];

                            if (value instanceof Array) {
                                for (i = 0; i < value.length; ++i) {
                                    subValue = value[i];
                                    fullSubName = name + '[' + i + ']';
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + '&';
                                }
                            } else if (value instanceof Object) {
                                for (subName in value) {
                                    subValue = value[subName];
                                    fullSubName = name + '[' + subName + ']';
                                    innerObj = {};
                                    innerObj[fullSubName] = subValue;
                                    query += param(innerObj) + '&';
                                }
                            } else if (value !== undefined && value !== null) {
                                query += encodeURIComponent(name) + '='
                                    + encodeURIComponent(value) + '&';
                            }
                        }

                        return query.length ? query.substr(0, query.length - 1) : query;
                    };

                    return angular.isObject(data) && String(data) !== '[object File]'
                        ? param(data)
                        : data;
                }];
                $httpProvider.interceptors.push(
                    function ($q, $location, $timeout) {
                        var number = 0;
                        function up() {
                            number++;
                            angular.element('ui-loading').fadeIn('slow');
                        }
                        
                        function down() {
                            number--;
                            if(number < 0)number = 0;
                            if(number === 0)$timeout(function () {
                                if(number === 0){
                                    angular.element('ui-loading').fadeOut('slow');
                                }
                            },500);
                        }
                        return {
                            'request': function (config) {
                                //处理AJAX请求（否则后台IsAjaxRequest()始终false）
                                up();
                                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                                return config || $q.when(config);
                            },
                            'requestError': function (rejection) {
                                up();
                                return rejection;
                            },
                            'response': function (response) {
                                down();
                                return response || $q.when(response);
                            },
                            'responseError': function (response) {
                                down();
                                console.log('responseError:' + response);
                                console.log(response);
                                if (response.status === 401 || response.status === 403) {
                                    $timeout(function () {
                                        //TODO
                                    }, 2000);
                                    response.msg = '会话超时!';
                                    response.error = true;
                                    return response;
                                }
                                else if (response.status === 500) {
                                    //TODO
                                    return false;
                                }else{
                                    response.msg = '请求异常'+response.status+'！';
                                    response.error = true;
                                    return response;
                                }
                                return $q.reject(response);
                            }
                        };
                    });
            })
        .factory("HttpUtils", function ($http, Project,ModalCtrl,modalCode,Loading) {

            return {
                get: get,
                post: post,
                postJson: postJson,
                delete:deleteFun,
                load:load
            }
            
            function get(url,params, callback, fail) {
                Loading.show();
                var paramUrl = setUrlParam(params);
                var config={headers:{Authorization:localStorage.token}};
                $http.get(Project.rootPath() + url + paramUrl,config).then(function (res) {
                    Loading.close();
                    if (res.status == 200 && res.data) {
                    	
                    	var token = res.headers().Token;
                    	if(token){
                    		localStorage.token = token;
                    	}
                    	
                        if(res.data.result){
                            callback(res.data);
                        }else{
                            if(res.data.message.indexOf('登录超时')>-1){
                                ModalCtrl.show('提示',res.data.message,modalCode.danger,function () {
                                    location.replace('http://127.0.0.1:8020/Web-comm'+'/admin/login.html');
                                },'登录')
                            }else {
                                ModalCtrl.show('错误提示',res.data.message,modalCode.danger);
                            }
                        }
                    }
                    errorDul(res);
                }), function (res) {
                    Loading.close();
                    fail();
                    console.log(url + "error");
                }
            }
            
            function setUrlParam(params){
            	var temp = ""
            	if(params){
            		var key , value;
            		for (key in params) {
                        value = params[key];
                        if(value){
                        	temp += key+"="+value +"&"
                        }
            		}
            		if(temp.length>0){
            			temp = "?"+temp.substring(0,temp.length-1);
            		}
            	}
            	return temp;
            }

            function load(url, datas,callback, fail) {
                window.location.href = Project.rootPath() + url;
            }
            function deleteFun(url, params, callback, fail){
            	Loading.show();
            	var paramUrl = setUrlParam(params);
            	$http.delete(Project.rootPath() + url+paramUrl)
            	.then(function(res){
            		Loading.close();
            		if (res.status == 200 && res.data) {
            			
            			var token = res.headers().token;
                    	if(token){
                    		localStorage.token = token;
                    	}
            			
                        if(res.data.result){
                            callback(res.data);
                        }else{
                            if(res.data.message && res.data.message.indexOf('登录超时')>-1){
                                ModalCtrl.show('提示',res.data.message,modalCode.danger,function () {
                                    location.replace('http://127.0.0.1:8020/Web-comm'+'/admin/login.html');
                                },'登录')
                            }else {
                                ModalCtrl.show('错误提示',res.data.message || res.data.message,modalCode.danger);
                            }
                        }
                    }else{
                    	errorDul(res);
                    }
            	},function(res){
            		Loading.close();
                    fail();
                    consoleLog(url + "error");
            	});
            }
            

            function post(url, datas, callback, fail) {
                Loading.show();
                //console.log(Project.rootPath() + url);
                
                var config={headers:{Authorization:localStorage.token}};
               
                
                $http.post(Project.rootPath() + url, datas,config).then(function (res) {
                    Loading.close();
                    if (res.status == 200 && res.data) {
                    	
                    	var token = res.headers().Token;
                    	if(token){
                    		localStorage.token = token
                    	}
                    	
                        if(res.data.result){
                            callback(res.data);
                        }else{
                            if(res.data.message && res.data.message.indexOf('登录超时')>-1){
                                ModalCtrl.show('提示',res.data.message,modalCode.danger,function () {
                                    location.replace('http://127.0.0.1:8020/Web-comm'+'/admin/login.html');
                                },'登录')
                            }else {
                                ModalCtrl.show('错误提示',res.data.message || res.data.message,modalCode.danger);
                            }
                        }
                    }else{
                    	errorDul(res);
                    }
                }, function (res) {
                    Loading.close();
                    fail();
                    consoleLog(url + "error");
                    //console.log(res);
                })
            }
            
            function postJson(url, datas, callback, fail) {
                Loading.show();
                //console.log(Project.rootPath() + url);
              //  $httpProvider.defaults.headers.postJson['Content-Type'] = 'application/json; charset=UTF-8';
                var config={headers:{Authorization:localStorage.token,'Content-Type':"application/json"}};
               
                
                $http.post(Project.rootPath() + url, datas,config).then(function (res) {
                    Loading.close();
                    if (res.status == 200 && res.data) {
                    	
                    	var token = res.headers().token;
                    	if(token){
                    		localStorage.token = "";
                    		localStorage.token = token
                    	}
                    	
                        if(res.data.result){
                            callback(res.data);
                        }else{
                            if(res.data.message && res.data.message.indexOf('登录超时')>-1){
                                ModalCtrl.show('提示',res.data.message,modalCode.danger,function () {
                                    location.replace('http://127.0.0.1:8020/Web-comm'+'/admin/login.html');
                                },'登录')
                            }else {
                                ModalCtrl.show('错误提示',res.data.message || res.data.message,modalCode.danger);
                            }
                        }
                    }else{
                    	errorDul(res);
                    }
                }, function (res) {
                    Loading.close();
                    fail();
                    consoleLog(url + "error");
                    //console.log(res);
                })
            }

            function errorDul(res) {
                if(res.error){
                    ModalCtrl.show('提示',res.msg,modalCode.danger);
                }
            }
        });
})();