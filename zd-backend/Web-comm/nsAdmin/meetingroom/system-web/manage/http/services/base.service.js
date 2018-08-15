'use strict';
/**
 * 基础服务对象
 * 数据异步交互基础
 * 
 *  let bs = new BaseService();
 *  
 *  
 * 
 * @param {*}  
 * @param {*}  
 */

function baseService($http,$jQLike,$q){
    var host = '/meeting-room/'
    function Base(){
        this.showloading = false;
        this.locked =false; 
        this.url = '';
        this.data = {};
        this.error = function(){
            console.error(arguments)
        }
        this.success = null;
        Base.prototype.commit = function(){
            var defer = $q.defer();
            var thiz = this;
            var formData = new FormData();            
            angular.forEach(this.data,function(val,key){				
                if(null!=val &&'null' !=val && typeof val != 'undefined'){
                    if(angular.isArray(val)){
                        angular.forEach(val,function(v){
                            formData.append(key,v)
                        })
                    }else{
                        formData.append(key,val);
                    }
                }
            })
            var xhr   = new XMLHttpRequest();
            xhr.upload.onprogress = function (event) {
                if(thiz.progress){
                   thiz.progress.call(this,event.loaded,event.total)
                }
            }
           xhr.onload = function () {
               var readyState = xhr.readyState;
               var status = xhr.status;
               if(status==200){
                   var response = JSON.parse(xhr.response);
                    if(typeof thiz.success=='function'){
                        thiz.success.call(this,response);
                    } else{
                        
                    }
                  defer.resolve(response);
               }else{
                  defer.reject('服务时效')
               }
           };
            xhr.onerror = function () {
                if(thiz.locked){
                    thiz.locked = false;
                }
           };
           xhr.onabort = function () {
               if(thiz.locked){
                    thiz.locked = false;
                }
           };
           xhr.open("POST", this.url, true);
           xhr.setRequestHeader('Authorization', localStorage.token);
           xhr.withCredentials = false;
           xhr.transformRequest= angular.identity
           xhr.send(formData);
          return defer.promise;
        }
        Base.prototype.submit = function(url,data){
            this.url =host+ url;
            this.data = data;
            return this.commit()
        }   
         
        Base.prototype.load = function(url,data){
            this.url = host+url;
            this.data = data;
           return  this.commit();
        }
        // Base.prototype.get=async(url,params)=>{
        //   let result=await $http.get(url,params);
        //   return result.data;
        // }
        // Base.prototype.post=async(url,params)=>{
        //   let result=await $http.post(url,$jQLike(params));
        //   return result.data;
        // }
    }
    return Base;
}

 
baseService.$inject = ['$http','$httpParamSerializerJQLike','$q'];
export default angular.module('baseService',[]).factory('baseService',baseService).name;